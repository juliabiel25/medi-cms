
import { Button, Card, CardBody, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Fragment, useEffect, useRef, useState } from "react";
import { dbStore, getData, getDataWithReferences, getDocWithReferences, updateDocument } from '../../../../../firebase';
import { useLocation } from 'react-router-dom';
import PageTitle from "../../../../../Layout/AppMain/PageTitle";

const ServiceForm = ({addService}) => {
  const { state } = useLocation();

  const service = state?.service;

  const [fetchedData, setFetchedData] = useState({data: {}, ref: null});
  const updated = useRef({});
  const [unsaved, setUnsaved] = useState([]);
  const [fetchedDoctors, setFetchedDoctors] = useState([])

  useEffect(() => {    
    async function fetchData() {
      const fetched = await getDocWithReferences(dbStore, service.ref);
      console.log('fetched service:', fetched);
      setFetchedData(fetched);
    }
    async function fetchDoctors() {
      const fetched = await getDataWithReferences(dbStore, 'doctors');
      console.log('fetched doctors:', fetched);
      setFetchedDoctors(fetched);
    }
    fetchData();
    fetchDoctors();
  }, [])

  function updateData(field, e) {
    updated.current = {...updated.current, [field]: e.target.value}
    if (fetchedData.data[field] !== e.target.value) {
      if (!unsaved.includes(field)) {
        setUnsaved(prev => [...prev, field])      
      }
    } else {
      // if value was updated back to the original value -> remove field from unsaved
      setUnsaved(prev => prev.filter(item => item !== field));
    }
  }

  async function submitData() {
    if (unsaved.length > 0) {      
      const updateData = {};
      unsaved.forEach(field => updateData[field] = updated.current[field]);

      
      await updateDocument(dbStore, fetchedData.ref, updateData);
    }
  }
  

return (
    <Fragment>
      <TransitionGroup>
        <CSSTransition component="div" classNames="TabsAnimation" appear={true}
          timeout={1500} enter={false} exit={false}>
          <div>
            <PageTitle heading={addService ? 'Dodaj nową usługę' : 'Edycja usługi ' + fetchedData?.data.name}
              icon="pe-7s-eyedropper icon-gradient bg-premium-dark"/>
            <Container fluid>
              <Row>
                <Card className='main-card mb-3'>
                  <CardBody>
                    <CardTitle>Dane usługi</CardTitle>
                    <Form>
                    <FormGroup>
                      <Label for="name">Nazwa</Label>
                      <Input type="text" name="name" id="name" className={unsaved.includes('name') ? 'input-unsaved' : ''} 
                      defaultValue={fetchedData?.data.name} 
                      onChange={(e) => updateData('name', e)}/>
                    </FormGroup>
                 
                    <FormGroup>
                      <Label for="description">Opis</Label>
                      <Input type="textarea" name="description" id="street" className={unsaved.includes('description') ? 'input-unsaved' : ''}
                       defaultValue={fetchedData?.data.description} 
                       onChange={(e) => updateData('description', e)}/>
                    </FormGroup>
                     
                    <Button color="primary" className="mt-1" onClick={submitData}>
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
  )
}

export default ServiceForm;