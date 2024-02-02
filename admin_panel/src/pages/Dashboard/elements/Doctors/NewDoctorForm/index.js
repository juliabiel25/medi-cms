import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
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
  uploadFile
} from "../../../../../firebase";

import ImageForm from "../../ImageForm";
import PageTitle from "../../../../../Layout/AppMain/PageTitle";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NewDoctorForm = ({}) => {
  const updated = useRef({});
  const imageUpdated = useRef({});
  const imageFile = useRef({});
  const [unsaved, setUnsaved] = useState([]);
  const [imageUnsaved, setImageUnsaved] = useState([]);
  const history = useHistory();
  const [fetchedDepartments, setFetchedDepartments] = useState([]);
  const [fetchedServices, setFetchedServices] = useState([]);
  async function fetchDepartments() {
    const fetched = await getDataWithReferences(dbStore, "departments");
    console.log("fetched departments:", fetched);
    setFetchedDepartments(fetched);
  }

  async function fetchServices() {
    const fetched = await getDataWithReferences(dbStore, "services");
    console.log("fetched services:", fetched);
    setFetchedServices(fetched);
  }

  useEffect(() => {
    fetchServices();
  }, []);

  function updateDoctorData(field, value) {
    // if new value is empty --> erase unsaved field styling
    if (!value) {
      setUnsaved(prev => prev.filter(item => item !== field));
    }
    // save field as unsaved
    if (!unsaved.includes(field)) {
      setUnsaved(prev => [...prev, field]);
    }
    updated.current[field] = value;
  }

  function updateImageData(field, value) {
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
    updateImageData("image", file);
    imageFile.current = file;
  }

  async function submitData() {
    if (unsaved.length > 0 || imageUnsaved.length > 0) {
      const dataToSubmit = {};
      unsaved.forEach(field => (dataToSubmit[field] = updated.current[field]));

      // upload image file to storage
      if (imageFile.current) {
        const result = await uploadFile(imageFile.current);
        const url = result?.url;

        // create new image document in firestore and save document reference
        let createDocData = {};
        if (imageUpdated.current.name)
          createDocData["name"] = imageUpdated.current.name;
        if (imageUpdated.current.altName)
          createDocData["altName"] = imageUpdated.current.altName;
        if (imageUpdated.current.width)
          createDocData["width"] = imageUpdated.current.width;
        if (imageUpdated.current.height)
          createDocData["height"] = imageUpdated.current.height;

        console.log("createDocData", createDocData);
        const imageRef = await createDocument(dbStore, "images", {
          ...createDocData,
          url
        });
        // overwrite image property with document reference
        dataToSubmit["image"] = imageRef;
      }

      console.log("dataToSubmit: ", dataToSubmit);

      // create new doctor document
      await createDocument(dbStore, "doctors", dataToSubmit);
      history.push("/dashboard/doctors");
    }
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
              heading={"Dodaj nowego lekarza"}
              icon="pe-7s-user icon-gradient bg-premium-dark"
            />
            <Container fluid>
              <Row>
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Zdjęcie profilowe</CardTitle>
                    <ImageForm
                      onUpdate={updateImageData}
                      onFileUpdate={updateFile}
                      unsaved={imageUnsaved}
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
                          name="services"
                          closeMenuOnSelect={false}
                          components={makeAnimated()}
                          defaultValue={[]}
                          isMulti
                          options={fetchedServices}
                          onChange={newValue =>
                            updateDoctorData(
                              "services",
                              newValue.map(item => item.ref)
                            )
                          }
                          getOptionLabel={option => option.data.name}
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

export default NewDoctorForm;
