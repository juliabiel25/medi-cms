import { Button, Card, CardBody, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Fragment, useEffect, useState } from "react";
import { ref as dbRef, onValue } from 'firebase/database';
import { dbStore, getData, getGeneralInfo } from '../../../../firebase';

import PageTitle from "../../../../Layout/AppMain/PageTitle";

const GeneralInfo = ({}) => {
  const [info, setInfo] = useState({});
  const updated = {};
  const [unsaved, setUnsaved] = useState(false);

  function updateData(field, e) {
    if (info[field] !== e.target.value) {
      updated[field] = e.target.value;
      setUnsaved(true)      
    }
    console.log('new value: ', field, e)
  }
  
  useEffect(() => {    
    // const query = dbRef(db, "general_information");

    async function fetchData() {
      const fetched = await getData(dbStore, 'basic_information');
      console.log('fetched:', fetched);
      setInfo(fetched[0]);
    }
    fetchData();
    

  }, [])

  return (
    <Fragment>
      <TransitionGroup>
        <CSSTransition component="div" classNames="TabsAnimation" appear={true}
          timeout={1500} enter={false} exit={false}>
          <div>
            <PageTitle heading="Informacje ogólne"
              icon="pe-7s-info icon-gradient bg-premium-dark"/>
            <Container fluid>
              <Row>
                <Card className='main-card mb-3'>
                  <CardBody>
                    <CardTitle>Dane kliniki</CardTitle>
                    <Form>
                    <FormGroup>
                      <Label for="name">Nazwa</Label>
                      <Input type="text" name="name" id="name" defaultValue={info.name} onChange={(e) => updateData('name', e)}/>
                    </FormGroup>
                    <Row>
                      <Col md="8">
                        <FormGroup>
                          <Label for="city">Miasto</Label>
                          <Input type="text" name="city" id="city" defaultValue={info.city} onChange={(e) => updateData('city', e)}/>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for="postalCode">Kod pocztowy</Label>
                          <Input type="text" name="postalCode" id="postalCode" defaultValue={info.postalCode} onChange={(e) => updateData('postalCode', e)}/>
                        </FormGroup>
                      </Col>
                    </Row>
                      <FormGroup>
                        <Label for="country">Państwo</Label>
                        <Input type="text" name="country" id="country" defaultValue={info.country} onChange={(e) => updateData('country', e)}/>
                      </FormGroup>
                    <FormGroup>
                      <Label for="street">Ulica</Label>
                      <Input type="text" name="street" id="street" defaultValue={info.street} onChange={(e) => updateData('street', e)}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="buildingNo">Nr budynku</Label>
                      <Input type="text" name="buildingNo" id="buildingNo" defaultValue={info.buildingNumber} onChange={(e) => updateData('buildingNumber', e)}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="flatNo">Nr lokalu</Label>
                      <Input type="text" name="flatNo" id="flatNo" defaultValue={info.flatNumber} onChange={(e) => updateData('flatNumber', e)}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="phoneno">Nr telefonu</Label>
                      <Input type="tel" name="phoneno" id="phoneno" defaultValue={info.phoneNumber} onChange={(e) => updateData('phoneNumber', e)}/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="email">E-mail</Label>
                      <Input type="email" name="email" id="email" defaultValue={info.email} onChange={(e) => updateData('email', e)}/>
                    </FormGroup>                    
                    <FormGroup>
                      <Label for="footerText">Tekst stopki</Label>
                      <Input type="textarea" name="footerText" id="footerText" defaultValue={info.footerText} onChange={(e) => updateData('footerText', e)}/>
                    </FormGroup>                    
                    <FormGroup>
                      <Label for="fb">Facebook</Label>
                      <Input type="text" name="fb" id="fb" defaultValue={info.facebookAccount} onChange={(e) => updateData('facebookAccount', e)}/>
                    </FormGroup>                    
                    <FormGroup>
                      <Label for="ig">Instagram</Label>
                      <Input type="text" name="ig" id="ig"  defaultValue={info.instagramAccount} onChange={(e) => updateData('instagramAccount', e)}/>
                    </FormGroup>                    
                    <FormGroup>
                      <Label for="tw">Twitter</Label>
                      <Input type="text" name="tw" id="tw"  defaultValue={info.twitterAccount} onChange={(e) => updateData('twitterAccount', e)}/>
                    </FormGroup>       
                    <Button color="primary" className="mt-1">
                      Submit
                    </Button>
                    </Form>
                  </CardBody>           
                </Card>
              </Row>  
              <Row>            
                <Card className='main-card mb-3'>
                  <CardBody>
                    <CardTitle>Godziny otwarcia</CardTitle>
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

export default GeneralInfo;