import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  createDocument,
  dbStore,
  getDataWithReferences,
  getDocWithReferences,
  updateDocument,
  uploadFile
} from "../../../../../firebase";

import ImageForm from "../../ImageForm";
import PageTitle from "../../../../../Layout/AppMain/PageTitle";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom";

const DoctorForm = ({}) => {
  const location = useLocation();
  const state = location?.state;
  const history = useHistory();
  const [fetchedData, setFetchedData] = useState({ data: {}, ref: null });
  const [fetchedServices, setFetchedServices] = useState([]);
  const updated = useRef({});
  const imageUpdated = useRef({});
  const imageFile = useRef();
  // const imageFile = useRef({});
  const [imageURL, setImageURL] = useState();
  const [imageUnsaved, setImageUnsaved] = useState([]);
  const [unsaved, setUnsaved] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const doctor = useRef(state?.doctor);

  useEffect(() => {
    fetchData();
    fetchServices();
  }, []);

  useEffect(() => {
    setSelectedServices(fetchedData?.data?.services?.data ?? []);
  }, [fetchedData]);

  // if no 'doctor' obejct was detected then you likely reached this page without using the designated UI!
  // go back to the 'doctors' page
  if (!doctor.current) {
    history.push("/dashboard/doctors");
    return;
  }

  async function fetchData() {
    const fetched = await getDocWithReferences(dbStore, doctor.current.ref);
    console.log("fetched doctor:", fetched);
    setFetchedData(fetched);
  }

  async function fetchServices() {
    const fetched = await getDataWithReferences(dbStore, "services");
    console.log("fetched services:", fetched);
    setFetchedServices(fetched);
  }

  function updateDoctorData(field, e) {
    console.log("update field " + field + ": ", e);

    // save field as unsaved
    if (!unsaved.includes(field)) {
      setUnsaved(prev => [...prev, field]);
    }

    // array of references:
    if (e.constructor === Array) {
      console.log("New array value:", e);
      updated.current[field] = e ?? [];
      console.log(updated.current);
      // regular data:
      // } else {
      //   updated.current[field] = e ?? "";
      // }

      // update the current input state (value to be sent to firestore -- so just a ref or an empty array is needed here)

      // update the display state for selected items
      setSelectedServices(e);
      return;
    }

    updated.current = { ...updated.current, [field]: e };
    if (e) {
      // save field as unsaved
      if (!unsaved.includes(field)) {
        setUnsaved(prev => [...prev, field]);
      }
    } else {
      // if value was updated back to the original value -> remove field from unsaved
      setUnsaved(prev => prev.filter(item => item !== field));
    }
  }

  function updateImageData(field, value) {
    console.log("updateImageData: ", field, value);
    // if new value is empty --> erase unsaved field styling
    if (!value) {
      setImageUnsaved(prev => prev.filter(item => item !== field));
      return;
    }
    // save field as unsaved
    if (!imageUnsaved.includes(field)) {
      setImageUnsaved(prev => [...prev, field]);
    }
    imageUpdated.current[field] = value;
  }

  function updateFile(file) {
    // updateImageData("image", file);
    imageFile.current = file;
  }

  async function submitData() {
    console.log("submit", { unsaved, updated, imageUnsaved, imageUpdated });
    let createdImageDocRef;

    // IF FILE WAS CHANGED -> UPLOAD IT AND CREATE A NEW /IMAGES/ DOC
    if (imageUnsaved.includes("image")) {
      console.log("Uploading image & creating new image doc");

      const result = await uploadFile(imageFile.current);
      // const storageRef = result?.storageRef;
      const url = result?.url;
      const name = imageFile.current.name;

      const altName = imageUpdated.current["altName"];
      const width = imageUpdated.current["width"];
      const height = imageUpdated.current["height"];

      const createImageDocumentData = {
        name,
        url,
        ...(!!altName && { altName }),
        ...(!!height && { height }),
        ...(!!width && { width })
      };

      // create a new /images doc
      createdImageDocRef = await createDocument(
        dbStore,
        "images",
        createImageDocumentData
      );
      console.log("created image doc ref: ", createdImageDocRef);
    }
    // IF NO NEW IMAGE WAS ADDED BUT THE IMAGE DATA HAS CHANGED -> UPDATE THE IMAGE DOC
    else if (imageUnsaved.length > 0) {
      console.log("updating imageDoc with: ", imageUpdated.current, {
        dbStore,
        imgu: imageUpdated.current
      });
      const d = doctor.current.data.image.ref;
      const pathElems = `${d}`.split("/");
      await updateDocument(dbStore, ...pathElems, imageUpdated.current);
    }

    console.log("OWO");

    // UPDATE THE DOCTOR'S DOC
    const dataToSubmit = {};

    // save reference to newly created image
    if (createdImageDocRef) dataToSubmit["image"] = createdImageDocRef;

    if (
      unsaved.length > 0 // updated doctor data
    ) {
      // save changes to personal data
      console.log("updating doctor doc with: ", updated.current);
      unsaved.forEach(field => (dataToSubmit[field] = updated.current[field]));
    }

    // update changed values
    console.log("Doctor doc: data to submit", dataToSubmit);
    if (Object.keys(dataToSubmit).length > 0) {
      // update the doctor document
      await updateDocument(
        dbStore,
        ...`${doctor.current.ref.path}`.split("/"),
        dataToSubmit
      );
    }
    history.push("/dashboard/doctors");
  }

  return (
    <Fragment>
      <TransitionGroup>
        <CSSTransition
          component="div"
          classNames="TabsAnimation"
          appear={true}
          timeout={1500}
          enter={false}
          exit={false}
        >
          <div>
            <PageTitle
              heading={"Edytuj profil lekarza"}
              icon="pe-7s-user icon-gradient bg-premium-dark"
            />
            <Container fluid>
              <Row>
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Zdjęcie profilowe</CardTitle>
                    <ImageForm
                      url={fetchedData?.data?.image?.data?.url}
                      onUpdate={updateImageData}
                      onFileUpdate={updateFile}
                      unsaved={imageUnsaved}
                      defaultValues={fetchedData?.data?.image?.data}
                    />
                  </CardBody>
                </Card>
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Dane osobowe</CardTitle>
                    <Form>
                      <FormGroup>
                        <Label for="name">Imię</Label>
                        <Input
                          type="text"
                          name="name"
                          required
                          id="name"
                          defaultValue={fetchedData?.data?.name}
                          className={
                            unsaved.includes("name") ? "input-unsaved" : ""
                          }
                          onChange={e =>
                            updateDoctorData("name", e.target.value)
                          }
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="surname">Nazwisko</Label>
                        <Input
                          type="text"
                          name="surname"
                          defaultValue={fetchedData?.data?.surname}
                          required
                          id="surname"
                          className={
                            unsaved.includes("surname") ? "input-unsaved" : ""
                          }
                          onChange={e =>
                            updateDoctorData("surname", e.target.value)
                          }
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="specialty">Specjalność</Label>
                        <Input
                          type="text"
                          name="specialty"
                          required
                          id="specialty"
                          defaultValue={fetchedData?.data?.specialty}
                          className={
                            unsaved.includes("specialty") ? "input-unsaved" : ""
                          }
                          onChange={e =>
                            updateDoctorData("specialty", e.target.value)
                          }
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="phoneNumber">Numer telefonu</Label>
                        <Input
                          type="text"
                          name="phoneNumber"
                          defaultValue={fetchedData?.data?.phoneNumber}
                          id="phoneNumber"
                          required
                          className={
                            unsaved.includes("phoneNumber")
                              ? "input-unsaved"
                              : ""
                          }
                          onChange={e =>
                            updateDoctorData("phoneNumber", e.target.value)
                          }
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="email">Adres email</Label>
                        <Input
                          type="email"
                          name="email"
                          defaultValue={fetchedData?.data?.email}
                          required
                          id="email"
                          className={
                            unsaved.includes("email") ? "input-unsaved" : ""
                          }
                          onChange={e =>
                            updateDoctorData("email", e.target.value)
                          }
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="educationInformation">Wykształcenie</Label>
                        <Input
                          type="text"
                          name="educationInformation"
                          defaultValue={fetchedData?.data?.educationInformation}
                          id="educationInformation"
                          required
                          className={
                            unsaved.includes("educationInformation")
                              ? "input-unsaved"
                              : ""
                          }
                          onChange={e =>
                            updateDoctorData(
                              "educationInformation",
                              e.target.value
                            )
                          }
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="fieldOfInterest">
                          Zakres zainteresowań
                        </Label>
                        <Input
                          type="text"
                          name="fieldOfInterest"
                          id="fieldOfInterest"
                          defaultValue={fetchedData?.data?.fieldOfInterest}
                          className={
                            unsaved.includes("fieldOfInterest")
                              ? "input-unsaved"
                              : ""
                          }
                          onChange={e =>
                            updateDoctorData("fieldOfInterest", e.target.value)
                          }
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="facebookAccount">Facebook</Label>
                        <Input
                          type="text"
                          name="facebookAccount"
                          defaultValue={fetchedData?.data?.facebookAccount}
                          id="facebookAccount"
                          className={
                            unsaved.includes("facebookAccount")
                              ? "input-unsaved"
                              : ""
                          }
                          onChange={e =>
                            updateDoctorData("facebookAccount", e.target.value)
                          }
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="linkedInAccount">LinkedIn</Label>
                        <Input
                          type="text"
                          name="linkedInAccount"
                          id="linkedInAccount"
                          defaultValue={fetchedData?.data?.linkedInAccount}
                          className={
                            unsaved.includes("linkedInAccount")
                              ? "input-unsaved"
                              : ""
                          }
                          onChange={e =>
                            updateDoctorData("linkedInAccount", e.target.value)
                          }
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="services">Usługi</Label>
                        <Select
                          id="services"
                          className={
                            unsaved.includes("services") ? "input-unsaved" : ""
                          }
                          name="services"
                          closeMenuOnSelect={false}
                          components={makeAnimated()}
                          defaultValue={fetchedData?.data?.services?.data}
                          // defaultValue={fetchedData?.data?.services?.data.map(
                          //   el => el.ref
                          // )}
                          isMulti
                          options={fetchedServices}
                          onChange={
                            newValue => updateDoctorData("services", newValue)
                            // onChange={newValue =>
                            //   updateDoctorData(
                            //     "services",
                            //     newValue.map(item => item?.ref)
                            //   )
                          }
                          // getOptionValue={option => option.ref}
                          getOptionLabel={option => option.data?.name}
                        />
                      </FormGroup>

                      <Button
                        color="primary"
                        className="mt-1"
                        onClick={submitData}
                        disabled={
                          unsaved.length === 0 && imageUnsaved.length === 0
                        }
                      >
                        Zapisz zmiany
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Row>
            </Container>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  );
};
export default DoctorForm;
