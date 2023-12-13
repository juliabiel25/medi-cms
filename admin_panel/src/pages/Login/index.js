import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import React, { Component, Fragment } from "react";

import Slider from "react-slick";

const Login = ({}) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    initialSlide: 0,
    autoplay: true,
    adaptiveHeight: true
  };

  return (
    <Fragment>
      <div className="h-100">
        <Row className="h-100 g-0">
          <Col lg="4" className="d-none d-lg-block">
          </Col>
          <Col lg="8" md="12" className="h-100 d-flex bg-white justify-content-center align-items-center">
            <Col lg="9" md="10" sm="12" className="mx-auto app-login-box">
              <div className="app-logo" />
              <h4 className="mb-0">
                <div>Zaloguj się do panelu administratora</div>
                {/* <span>Please sign in to your account.</span> */}
              </h4>
              {/* <h6 className="mt-3">
                No account?{" "}
                <a href="https://colorlib.com/" onClick={(e) => e.preventDefault()} className="text-primary">
                  Sign up now
                </a>
              </h6> */}
              <Row className="divider" />
              <div>
                <Form>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="exampleEmail">E-mail</Label>
                        <Input type="email" name="email" id="exampleEmail"/>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="examplePassword">Hasło</Label>
                        <Input type="password" name="password" id="examplePassword"/>
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* <FormGroup check>
                    <Input type="checkbox" name="check" id="exampleCheck" />
                    <Label for="exampleCheck" check>
                      Keep me logged in
                    </Label>
                  </FormGroup> */}
                  <Row className="divider" />
                  <div className="d-flex align-items-center">
                    <div className="ms-auto">
                      <a href="https://colorlib.com/" onClick={(e) => e.preventDefault()} className="btn-lg btn btn-link" >
                        Przywróć hasło
                      </a>{" "}
                      <Button color="primary" size="lg">
                        Zaloguj
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </Col>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
}

export default Login;