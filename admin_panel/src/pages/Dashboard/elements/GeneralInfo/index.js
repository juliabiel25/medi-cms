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

import { Fragment } from "react";

const GeneralInfo = ({}) => {
  return (
    <Fragment>
      <TransitionGroup>
        <CSSTransition component="div" classNames="TabsAnimation" appear={true}
          timeout={0} enter={false} exit={false}>
          <Container fluid>
            <Row>
              <Col md="6">
                uwu
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Controls Types</CardTitle>
                    <Form>
                      <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder"/>
                      </FormGroup>
                      <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder"/>
                      </FormGroup>
                      <FormGroup>
                        <Label for="exampleSelect">Select</Label>
                        <Input type="select" name="select" id="exampleSelect">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                      </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  )
}

export default GeneralInfo;