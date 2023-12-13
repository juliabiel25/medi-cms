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
import { Fragment, useParams } from "react";

import PageTitle from "../../../../Layout/AppMain/PageTitle";
import avatar2 from "../../../../assets/utils/images/avatars/2.jpg";

const DoctorProfile = ({match}) => {
    // const {id} = useParams();

    // console.log(id)

    const data = {
      firstName: 'Stanisław',
      lastName: 'Kowalski',
      specialty: 'Pediatra'
    }
  
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
                <Card>
                  
                </Card>                 
              </Row>
            </Container>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  )
}

export default DoctorProfile;