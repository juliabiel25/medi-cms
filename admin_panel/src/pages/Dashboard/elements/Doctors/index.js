import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Fragment, useEffect, useRef, useState } from "react";
import { dbStore, deleteDocument, getData } from "../../../../firebase";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PageTitleCustom from "../../../../Layout/AppMain/PageTitleCustom";
import avatar1 from "../../../../assets/utils/images/avatars/1.jpg";
import avatar2 from "../../../../assets/utils/images/avatars/2.jpg";
import avatar3 from "../../../../assets/utils/images/avatars/3.jpg";
import avatar4 from "../../../../assets/utils/images/avatars/4.jpg";
import { color } from "d3-color";
import { useHistory } from "react-router-dom";

const Doctors = ({}) => {
  // type:: {data: {}, ref: {}} []
  const [fetchedData, setFetchedData] = useState([]);
  const history = useHistory();

  async function fetchData() {
    const fetched = await getData(dbStore, "doctors");
    console.log("fetched doctors:", fetched);
    setFetchedData(fetched);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleAddDoctor() {
    history.push("/dashboard/doctors/new");
  }

  async function handleDelete(row, db) {
    console.log("delete", row);
    await deleteDocument(db, row.ref);
    fetchData();
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
            <PageTitleCustom
              heading="Lekarze"
              icon="pe-7s-users icon-gradient bg-premium-dark"
              buttons={[
                {
                  name: "Dodaj lekarza",
                  className: "",
                  color: "success",
                  onClick: handleAddDoctor
                }
              ]}
            />
            <Container fluid>
              <Row>
                {fetchedData.map(doctor => (
                  <Col sm="12" lg="6" xl="4" key={`doctor-widget-id-${doctor.data.id}`}>
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
                              <h5 className="menu-header-title">
                                {doctor.data.name} {doctor.data.surname}
                              </h5>
                              <h6 className="menu-header-subtitle">
                                {doctor.data.specialty}
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
                              <Col sm="6">
                                <div className="p-1">
                                  <Link
                                    to={{
                                      pathname: "/dashboard/doctors/edit",
                                      state: { doctor: doctor }
                                    }}
                                  >
                                    <Button
                                      className="btn-icon-vertical btn-transition-text btn-transition btn-transition-alt pt-2 pb-2"
                                      outline
                                      color="focus"
                                    >
                                      <i className="lnr-sun text-primary opacity-7 btn-icon-wrapper mb-2">
                                        {" "}
                                      </i>
                                      Wyświetl / Edytuj profil
                                    </Button>
                                  </Link>
                                </div>
                              </Col>
                              <Col sm="6">
                                <div className="p-1">
                                  <Button
                                    className="btn-icon-vertical btn-transition-text btn-transition btn-transition-alt pt-2 pb-2"
                                    outline
                                    color="danger"
                                    onClick={() =>
                                      handleDelete(doctor, dbStore)
                                    }
                                  >
                                    <i className="lnr-trash text-primary opacity-7 btn-icon-wrapper mb-2">
                                      {" "}
                                    </i>
                                    Usuń lekarza
                                  </Button>
                                </div>
                              </Col>
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
  );
};

export default Doctors;
