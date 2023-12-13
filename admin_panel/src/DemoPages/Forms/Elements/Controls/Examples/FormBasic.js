import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from "reactstrap";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import React, { Fragment } from "react";

import FormsCustomControls from "./CustomControls";

export default class FormsDefault extends React.Component {
  render() {
    return (
      <Fragment>
        <TransitionGroup>
          <CSSTransition component="div" classNames="TabsAnimation" appear={true}
            timeout={0} enter={false} exit={false}>
            <Container fluid>
              <Row>
                  <Card className="main-card mb-3">
                    <CardBody>
                      <CardTitle>Dane kliniki</CardTitle>
                      <Form>
                        <FormGroup>
                          <Label for="name">Nazwa</Label>
                          <Input type="text" name="name" id="name"/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="city">Miasto</Label>
                          <Input type="text" name="city" id="city"/>
                        </FormGroup>
                        <FormGroup>
                          <Label for="country">Państwo</Label>
                          <Input type="text" name="country" id="country"/>
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

                       
                        <Button color="primary" className="mt-1">
                          Submit
                        </Button>
                      </Form>
                    </CardBody>
                  </Card>
                <Col md="6">
                </Col>
                <Col md="6">
                  <Card className="main-card mb-3">
                    <CardBody>
                      <CardTitle>Sizing</CardTitle>
                      <Form>
                        <Input className="mb-2" placeholder="lg" bsSize="lg" />
                        <Input className="mb-2" placeholder="default" />
                        <Input className="mb-2" placeholder="sm" bsSize="sm" />
                        <div className="divider" />
                        <Input className="mb-2" type="select" bsSize="lg">
                          <option>Large Select</option>
                        </Input>
                        <Input className="mb-2" type="select">
                          <option>Default Select</option>
                        </Input>
                        <Input type="select" bsSize="sm">
                          <option>Small Select</option>
                        </Input>
                      </Form>
                    </CardBody>
                  </Card>
                  <Card className="main-card mb-3">
                    <CardBody>
                      <CardTitle>Checkboxes & Radios</CardTitle>
                      <Form>
                        <FormGroup tag="fieldset">
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio1" /> Option one is
                              this and that—be sure to include why it's great
                            </Label>
                          </FormGroup>
                          <FormGroup check>
                            <Label check>
                              <Input type="radio" name="radio1" /> Option two can
                              be something else and selecting it will deselect
                              option one
                            </Label>
                          </FormGroup>
                          <FormGroup check disabled>
                            <Label check>
                              <Input type="radio" name="radio1" disabled /> Option
                              three is disabled
                            </Label>
                          </FormGroup>
                        </FormGroup>
                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox" /> Check me out
                          </Label>
                        </FormGroup>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <FormsCustomControls />
            </Container>
          </CSSTransition>
        </TransitionGroup>
      </Fragment>
    );
  }
}
