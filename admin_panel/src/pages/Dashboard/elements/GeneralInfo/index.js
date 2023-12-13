import { Button, Card, CardBody, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Fragment } from "react";
import PageTitle from "../../../../Layout/AppMain/PageTitle";

const GeneralInfo = ({}) => {
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
                      <Input type="text" name="name" id="name"/>
                    </FormGroup>
                    <Row>
                      <Col md="8">
                        <FormGroup>
                          <Label for="city">Miasto</Label>
                          <Input type="text" name="city" id="city"/>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for="postalCode">Kod pocztowy</Label>
                          <Input type="text" name="postalCode" id="postalCode"/>
                        </FormGroup>
                      </Col>
                    </Row>
                      <FormGroup>
                        <Label for="country">Państwo</Label>
                        <Input type="text" name="country" id="country"/>
                      </FormGroup>
                    <FormGroup>
                      <Label for="street">Ulica</Label>
                      <Input type="text" name="street" id="street"/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="buildingNo">Nr budynku</Label>
                      <Input type="text" name="buildingNo" id="buildingNo"/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="flatNo">Nr lokalu</Label>
                      <Input type="text" name="flatNo" id="flatNo"/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="phoneno">Nr telefonu</Label>
                      <Input type="tel" name="phoneno" id="phoneno"/>
                    </FormGroup>
                    <FormGroup>
                      <Label for="email">E-mail</Label>
                      <Input type="email" name="email" id="email"/>
                    </FormGroup>                    
                    <FormGroup>
                      <Label for="footerText">Tekst stopki</Label>
                      <Input type="textarea" name="footerText" id="footerText"/>
                    </FormGroup>                    
                    <FormGroup>
                      <Label for="fb">Facebook</Label>
                      <Input type="text" name="fb" id="fb"/>
                    </FormGroup>                    
                    <FormGroup>
                      <Label for="ig">Instagram</Label>
                      <Input type="text" name="ig" id="ig"/>
                    </FormGroup>                    
                    <FormGroup>
                      <Label for="tw">Twitter</Label>
                      <Input type="text" name="tw" id="tw"/>
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