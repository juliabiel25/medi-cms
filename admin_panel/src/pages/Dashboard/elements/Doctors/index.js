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
  ListGroup,
  ListGroupItem,
  Row
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Fragment, useEffect } from "react";
import { db, getDoctors } from '../../../../firebase';

import DataTable from 'react-data-table-component';
import PageTitle from "../../../../Layout/AppMain/PageTitle";
import avatar1 from "../../../../assets/utils/images/avatars/1.jpg";
import avatar2 from "../../../../assets/utils/images/avatars/2.jpg";
import avatar3 from "../../../../assets/utils/images/avatars/3.jpg";
import avatar4 from "../../../../assets/utils/images/avatars/4.jpg";
import { color } from "d3-color";

let data = [];

const Doctors = ({}) => {
  useEffect( () => {
    const fetchData = async () => {
      data = await getDoctors(db)
    };
    fetchData();
    console.log(data)
  }, [])
  
    return (
    <Fragment>
      <TransitionGroup>
        <CSSTransition component="div" classNames="TabsAnimation" appear={true}
          timeout={1500} enter={false} exit={false}>
          <div>  
            <PageTitle heading="Lekarze"
              icon="pe-7s-users icon-gradient bg-premium-dark"/>
            <Container fluid>
              <Row>
                {data.map(doctor => (
                  <Col sm="12" lg="6" xl="4">
                    <Card className="mb-3 profile-responsive">
                      <div className="dropdown-menu-header">
                        <div className="dropdown-menu-header-inner bg-white text-dark">
                          <div className="menu-header-content btn-pane-right">
                            <div className="avatar-icon-wrapper me-3 avatar-icon-xl btn-hover-shine">
                              <div className="avatar-icon rounded">
                                <img src={avatar2} alt="Avatar 5" />
                              </div>
                            </div>
                            <div>
                              <h5 className="menu-header-title">{doctor.name} {doctor.surname}</h5>
                              <h6 className="menu-header-subtitle">
                                {doctor.specialty}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ListGroup flush>
                        <ListGroupItem className="p-0">
                          {/* <div className="widget-content">
                            <div className="text-center">
                            </div>
                          </div> */}
                        </ListGroupItem>
                        <ListGroupItem className="p-0">
                          <div className="grid-menu grid-menu-2col">
                            <Row className="g-0">
                              {/* <Col sm="6"> */}
                                <div className="p-1">
                                  <Button className="btn-icon-vertical btn-transition-text btn-transition btn-transition-alt pt-2 pb-2"
                                    outline color="focus">
                                    <i className="lnr-sun text-primary opacity-7 btn-icon-wrapper mb-2"> {" "} </i>
                                    Wyświetl profil
                                  </Button>
                                </div>
                              {/* </Col> */}
                              {/* <Col sm="6">
                                <div className="p-1">
                                  <Button className="btn-icon-vertical btn-transition-text btn-transition btn-transition-alt pt-2 pb-2"
                                    outline color="focus">
                                    <i className="lnr-magic-wand text-primary opacity-7 btn-icon-wrapper mb-2"> {" "} </i>
                                    View Leads
                                  </Button>
                                </div>
                              </Col> */}
                            </Row>
                          </div>
                        </ListGroupItem>
                      </ListGroup>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  )
}

export default Doctors;