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
  updateDocument
} from "../../../../../firebase";

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
  const [unsaved, setUnsaved] = useState([]);
  const [selectedServices, setSelectedServices] = useState([])
  
  useEffect(() => {
    fetchData();
    fetchServices();
  }, []);

  useEffect(() => {
    setSelectedServices(fetchedData?.data?.services?.data ?? [])           
  }, [fetchedData]);
  
  // if no 'doctor' obejct was detected then you likely reached this page without using the designated UI!
  // go back to the 'doctors' page
  if (!state || !state?.doctor) {
    history.push('/dashboard/doctors');
    return;
  }
  const doctor = state?.doctor;
  

  async function fetchData() {
    const fetched = await getDocWithReferences(dbStore, doctor.ref);
    console.log("fetched doctor:", fetched);
    setFetchedData(fetched);
  }
    
  async function fetchServices() {
    const fetched = await getDataWithReferences(dbStore, "services");
    console.log("fetched services:", fetched);
    setFetchedServices(fetched);
  }



   function updateData(field, e) {
    console.log('update field ' + field + ': ', e)  
      
    // assume that if "e" doesn't have a .target property = it's actually just the new value to be saved ^^'
    if (!e.target) {
      // save field as unsaved
      if (!unsaved.includes(field)) {
        setUnsaved(prev => [...prev, field]);
      }
      // update the current input state (value to be sent to firestore -- so just a ref or an empty array is needed here)
      updated.current[field] = e.map(el => el?.ref) ?? [];

      // update the display state for selected items
      setSelectedServices(e);
      return;
    }
    
    updated.current = { ...updated.current, [field]: e.target.value };
    if (e.target.value) {
      // save field as unsaved
      if (!unsaved.includes(field)) {
        setUnsaved(prev => [...prev, field]);
      }
    } else {
      // if value was updated back to the original value -> remove field from unsaved
      setUnsaved(prev => prev.filter(item => item !== field));
    }
  }

  async function submitData() {
    if (unsaved.length > 0) {
      const updateData = {};
      unsaved.forEach(field => (updateData[field] = updated.current[field]));

      await updateDocument(dbStore, fetchedData.ref, updateData);
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
              heading={"Edytuj dane lekarza"}
              icon="pe-7s-user icon-gradient bg-premium-dark"
            />
            <Container fluid>
              <Row>
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Dane osobowe</CardTitle>
                    <Form>
                      <FormGroup>
                        <Label for="name">Imię</Label>
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          defaultValue={fetchedData.data?.name}
                          className={
                            unsaved.includes("name") ? "input-unsaved" : ""
                          }
                          onChange={e => updateData("name", e)}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="surname">Nazwisko</Label>
                        <Input
                          type="text"
                          name="surname"
                          id="surname"
                          defaultValue={fetchedData.data?.surname}
                          className={
                            unsaved.includes("surname") ? "input-unsaved" : ""
                          }
                          onChange={e => updateData("surname", e)}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="specialty">Specjalność</Label>
                        <Input
                          type="text"
                          name="specialty"
                          id="specialty"
                          defaultValue={fetchedData.data?.specialty}
                          className={
                            unsaved.includes("specialty") ? "input-unsaved" : ""
                          }
                          onChange={e => updateData("specialty", e)}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="phoneNumber">Numer telefonu</Label>
                        <Input
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          defaultValue={fetchedData.data?.phoneNumber}
                          className={
                            unsaved.includes("phoneNumber")
                              ? "input-unsaved"
                              : ""
                          }
                          onChange={e => updateData("phoneNumber", e)}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="email">Adres email</Label>
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          defaultValue={fetchedData.data?.email}
                          className={
                            unsaved.includes("email") ? "input-unsaved" : ""
                          }
                          onChange={e => updateData("email", e)}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="educationInformation">Wykształcenie</Label>
                        <Input
                          type="text"
                          name="educationInformation"
                          id="educationInformation"
                          defaultValue={fetchedData.data?.educationInformation}
                          className={
                            unsaved.includes("educationInformation")
                              ? "input-unsaved"
                              : ""
                          }
                          onChange={e => updateData("educationInformation", e)}
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
                          defaultValue={fetchedData.data?.fieldOfInterest}
                          className={
                            unsaved.includes("fieldOfInterest")
                              ? "input-unsaved"
                              : ""
                          }
                          onChange={e => updateData("fieldOfInterest", e)}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="facebookAccount">Facebook</Label>
                        <Input
                          type="text"
                          name="facebookAccount"
                          id="facebookAccount"
                          defaultValue={fetchedData.data?.facebookAccount}
                          className={
                            unsaved.includes("facebookAccount")
                              ? "input-unsaved"
                              : ""
                          }
                          onChange={e => updateData("facebookAccount", e)}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="linkedInAccount">LinkedIn</Label>
                        <Input
                          type="text"
                          name="linkedInAccount"
                          id="linkedInAccount"
                          defaultValue={fetchedData.data?.linkedInAccount}
                          className={
                            unsaved.includes("linkedInAccount")
                              ? "input-unsaved"
                              : ""
                          }
                          onChange={e => updateData("linkedInAccount", e)}
                        />
                      </FormGroup>
                      
                      <FormGroup>
                        <Label for="services">Usługi</Label>
                        <Select 
                          id="services"
                          name="services"
                          closeMenuOnSelect={false} 
                          value={selectedServices}
                          isMulti 
                          components={makeAnimated()}
                          options={fetchedServices}
                          getOptionLabel={option => option?.data.name}
                          onChange={newValue => updateData("services", newValue)}
                          getOptionValue={option => option.ref.path}
                        />                          
                      </FormGroup>
                      
                      <Button
                        color="primary"
                        className="mt-1"
                        onClick={submitData}
                        disabled={unsaved.length === 0}
                        // disabled={}
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
