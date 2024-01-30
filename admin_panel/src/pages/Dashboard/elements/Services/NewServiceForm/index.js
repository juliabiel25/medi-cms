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
  getData,
  getDataWithReferences,
  getDocWithReferences
} from "../../../../../firebase";

import PageTitle from "../../../../../Layout/AppMain/PageTitle";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom";

const NewServiceForm = ({}) => {
  const updated = useRef({});
  
  const [unsaved, setUnsaved] = useState([]);
  // const [fetchedData, setFetchedData] = useState({ data: {}, ref: null });

  const [fetchedDoctors, setFetchedDoctors] = useState([]);
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  
  const [fetchedDepts, setFetchedDepts] = useState([]);
  const [selectedDept, setSelectedDept] = useState({data: {}, ref: null});
  
  const history = useHistory();
  const location = useLocation();
  const state = location?.state;

  useEffect(() => {
    // fetchData();
    fetchDoctors();
    fetchDepartments();
  }, []);

  
  // if (!state || !state?.service) {
  //   history.push('/dashboard/services');
  //   return;
  // }
  // const service = state?.service;

  async function fetchDoctors() {
    const fetched = await getDataWithReferences(dbStore, "doctors");
    console.log("fetched doctors:", fetched);
    setFetchedDoctors(fetched);
  }
  async function fetchDepartments() {
    const fetched = await getDataWithReferences(dbStore, "departments");
    console.log("fetched departments:", fetched);
    setFetchedDepts(fetched);
  }
  // async function fetchData() {
  //   const fetched = await getDocWithReferences(dbStore, service.ref);
  //   console.log("fetched service data:", fetched);
  //   setFetchedData(fetched);
  // }

  // function updateData(field, e) {
  //   updated.current = { ...updated.current, [field]: e.target.value };
  //   if (e.target.value) {
  //     if (!unsaved.includes(field)) {
  //       setUnsaved(prev => [...prev, field]);
  //     }
  //   } else {
  //     // if value was updated back to the original value -> remove field from unsaved
  //     setUnsaved(prev => prev.filter(item => item !== field));
  //   }
  // }
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

      await createDocument(dbStore, "services", updateData);
      // history.push("dashboard");
      history.goBack();
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
              heading={"Dodaj nową usługę"}
              icon="pe-7s-eyedropper icon-gradient bg-premium-dark"
            />
            <Container fluid>
              <Row>
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Dane usługi</CardTitle>
                    <Form>
                      <FormGroup>
                        <Label for="name">Nazwa</Label>
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          className={
                            unsaved.includes("name") ? "input-unsaved" : ""
                          }
                          onChange={e => updateData("name", e)}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="description">Opis</Label>
                        <Input
                          type="textarea"
                          name="description"
                          id="description"
                          className={
                            unsaved.includes("description")
                              ? "input-unsaved"
                              : ""
                          }
                          onChange={e => updateData("description", e)}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="grossPrice">Cena brutto</Label>
                        <Input
                          type="number"
                          name="grossPrice"
                          id="grossPrice"
                          className={
                            unsaved.includes("grossPrice")
                              ? "input-unsaved"
                              : ""
                          }
                          onChange={e => updateData("grossPrice", e)}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="VAT">Podatek VAT</Label>
                        <Input
                          type="number"
                          name="VAT"
                          id="VAT"
                          className={
                            unsaved.includes("VAT")
                              ? "input-unsaved"
                              : ""
                          }
                          onChange={e => updateData("VAT", e)}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="doctors">Lekarze wykonujący</Label>
                        <Select 
                          id="doctors"
                          name="doctors"
                          closeMenuOnSelect={false} 
                          value={selectedDoctors}
                          isMulti 
                          components={makeAnimated()}
                          options={fetchedDoctors}
                          getOptionLabel={option => `${option?.data?.name} ${option?.data?.surname}`}
                          onChange={newValue => updateData("doctors", newValue.map(item => item.ref))}
                          getOptionValue={option => option.ref.path}
                        />                          
                      </FormGroup>

                      <FormGroup>
                        <Label for="department">Wydział</Label>
                        <Select 
                          id="department"
                          name="department"
                          closeMenuOnSelect={false} 
                          value={selectedDoctors}
                          components={makeAnimated()}
                          options={fetchedDepts}
                          getOptionLabel={option => option?.data.name}
                          onChange={newValue => updateData("department", newValue.ref)}
                          getOptionValue={option => option.ref.path}
                        />                          
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

export default NewServiceForm;
