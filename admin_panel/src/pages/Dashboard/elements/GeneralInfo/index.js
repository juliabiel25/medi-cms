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
import { ref as dbRef, onValue } from "firebase/database";
import {
  dbStore,
  getData,
  getGeneralInfo,
  updateDocument
} from "../../../../firebase";

import PageTitle from "../../../../Layout/AppMain/PageTitle";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const GeneralInfo = ({}) => {
  const [fetchedInfo, setFetchedInfo] = useState({ data: {}, ref: undefined });
  const updated = useRef({});
  const [unsaved, setUnsaved] = useState([]);
  const history = useHistory();

  async function fetchData() {
    const fetched = await getData(dbStore, "basic_information");
    console.log("fetched info:", fetched);
    setFetchedInfo(fetched[0]);
  }

  function updateData(field, e) {
    updated.current = { ...updated.current, [field]: e.target.value };
    if (fetchedInfo.data[field] !== e.target.value) {
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

      await updateDocument(dbStore, fetchedInfo.ref, updateData);
      // fetchData();
      history.push("dashboard/general");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
              heading="Informacje ogólne"
              icon="pe-7s-info icon-gradient bg-premium-dark"
            />
            <Container fluid>
              <Row>
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Dane kliniki</CardTitle>
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
                          defaultValue={fetchedInfo.data.name}
                          onChange={e => updateData("name", e)}
                        />
                      </FormGroup>
                      <Row>
                        <Col md="8">
                          <FormGroup>
                            <Label for="city">Miasto</Label>
                            <Input
                              type="text"
                              name="city"
                              id="city"
                              className={
                                unsaved.includes("city") ? "input-unsaved" : ""
                              }
                              defaultValue={fetchedInfo.data.city}
                              onChange={e => updateData("city", e)}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label for="postalCode">Kod pocztowy</Label>
                            <Input
                              type="text"
                              name="postalCode"
                              id="postalCode"
                              className={
                                unsaved.includes("postalCode")
                                  ? "input-unsaved"
                                  : ""
                              }
                              defaultValue={fetchedInfo.data.postalCode}
                              onChange={e => updateData("postalCode", e)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <FormGroup>
                        <Label for="country">Państwo</Label>
                        <Input
                          type="text"
                          name="country"
                          id="country"
                          className={
                            unsaved.includes("country") ? "input-unsaved" : ""
                          }
                          defaultValue={fetchedInfo.data.country}
                          onChange={e => updateData("country", e)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="street">Ulica</Label>
                        <Input
                          type="text"
                          name="street"
                          id="street"
                          className={
                            unsaved.includes("street") ? "input-unsaved" : ""
                          }
                          defaultValue={fetchedInfo.data.street}
                          onChange={e => updateData("street", e)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="buildingNumber">Nr budynku</Label>
                        <Input
                          type="text"
                          name="buildingNumber"
                          id="buildingNumber"
                          className={
                            unsaved.includes("buildingNumber")
                              ? "input-unsaved"
                              : ""
                          }
                          defaultValue={fetchedInfo.data.buildingNumber}
                          onChange={e => updateData("buildingNumber", e)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="flatNumber">Nr lokalu</Label>
                        <Input
                          type="text"
                          name="flatNumber"
                          id="flatNumber"
                          className={
                            unsaved.includes("flatNumber")
                              ? "input-unsaved"
                              : ""
                          }
                          defaultValue={fetchedInfo.data.flatNumber}
                          onChange={e => updateData("flatNumber", e)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="phoneNumber">Nr telefonu</Label>
                        <Input
                          type="tel"
                          name="phoneNumber"
                          id="phoneNumber"
                          className={
                            unsaved.includes("phoneNumber")
                              ? "input-unsaved"
                              : ""
                          }
                          defaultValue={fetchedInfo.data.phoneNumber}
                          onChange={e => updateData("phoneNumber", e)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="email">E-mail</Label>
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          className={
                            unsaved.includes("email") ? "input-unsaved" : ""
                          }
                          defaultValue={fetchedInfo.data.email}
                          onChange={e => updateData("email", e)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="footerText">Tekst stopki</Label>
                        <Input
                          type="textarea"
                          name="footerText"
                          id="footerText"
                          className={
                            unsaved.includes("footerText")
                              ? "input-unsaved"
                              : ""
                          }
                          defaultValue={fetchedInfo.data.footerText}
                          onChange={e => updateData("footerText", e)}
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
                          defaultValue={fetchedInfo.data.facebookAccount}
                          onChange={e => updateData("facebookAccount", e)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="ig">Instagram</Label>
                        <Input
                          type="text"
                          name="ig"
                          id="ig"
                          className={
                            unsaved.includes("instagramAccount")
                              ? "input-unsaved"
                              : ""
                          }
                          defaultValue={fetchedInfo.data.instagramAccount}
                          onChange={e => updateData("instagramAccount", e)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="tw">Twitter</Label>
                        <Input
                          type="text"
                          name="tw"
                          id="tw"
                          className={
                            unsaved.includes("twitterAccount")
                              ? "input-unsaved"
                              : ""
                          }
                          defaultValue={fetchedInfo.data.twitterAccount}
                          onChange={e => updateData("twitterAccount", e)}
                        />
                      </FormGroup>
                      <Button
                        color="primary"
                        className="mt-1"
                        onClick={submitData}
                      >
                        Zapisz zmiany
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Row>
              <Row>
                <Card className="main-card mb-3">
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
  );
};

export default GeneralInfo;
