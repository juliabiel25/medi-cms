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
} from "../../../../../firebase";

import PageTitle from "../../../../../Layout/AppMain/PageTitle";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NewDoctorForm = ({}) => {
  const updated = useRef({});
  const [unsaved, setUnsaved] = useState([]);
  const history = useHistory();
  // const [fetchedDoctors, setFetchedDoctors] = useState([]);
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

  function updateData(field, e) {
    // assume that if "e" doesn't have a .target property = it's actually just the new value to be saved ^^'
    if (!e.target) {
      // save field as unsaved
      if (!unsaved.includes(field)) {
        setUnsaved(prev => [...prev, field]);
      }
      // update the current input state
      updated.current[field] = e;
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

      await createDocument(dbStore, "doctors", updateData);
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
                          onChange={e => updateData("name", e)}
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
                          onChange={e => updateData("surname", e)}
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
                          onChange={e => updateData("specialty", e)}
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
                          onChange={e => updateData("phoneNumber", e)}
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
                          onChange={e => updateData("email", e)}
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
                          components={makeAnimated()}
                          defaultValue={[]} 
                          isMulti 
                          options={fetchedServices}
                          getOptionLabel={option => option?.data.name}
                          onChange={newValue => updateData("services", newValue.map(item => item.ref))}/>
                          
                      </FormGroup>

                      <Button
                        color="primary"
                        className="mt-1"
                        onClick={submitData}
                        disabled={unsaved.length === 0}
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
