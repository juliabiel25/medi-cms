import { Button, Card, CardBody, CardHeader, CardTitle, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledButtonDropdown } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import DataTable from 'react-data-table-component';
import { Fragment } from "react";
import PageTitle from "../../../../Layout/AppMain/PageTitle";

const Services = ({}) => {
  const data = [
    {
      name: 'Badanie',
      description: 'Badanie badanie badanie',
      grossPrice: 240.0,
      vat: 0.23
    },
    {
      name: 'Badanie',
      description: 'Badanie badanie badanie',
      grossPrice: 240.0,
      vat: 0.23
    },
    {
      name: 'Badanie',
      description: 'Badanie badanie badanie',
      grossPrice: 240.0,
      vat: 0.23
    },
    {
      name: 'Badanie',
      description: 'Badanie badanie badanie',
      grossPrice: 240.0,
      vat: 0.23
    },
  ]

  const columns = [
    {
      name: "Nazwa",
      selector: row => row.name,
      sortable: true,
    },
    {
      name: "Opis",
      selector: row => row.description,
      sortable: true,
    },
    {
      name: "Cena brutto",
      selector: row => row.grossPrice,
      sortable: true,
    },
    {
      name: "VAT",
      selector: row => row.vat,
      sortable: true,
    },
  ]
  
  return (
    <Fragment>
      <TransitionGroup>
        <CSSTransition component="div" classNames="TabsAnimation" appear={true}
          timeout={1500} enter={false} exit={false}>
          <div>  
            <PageTitle heading="Usługi"
              icon="pe-7s-eyedropper icon-gradient bg-premium-dark"/>

            <Row>              
              <Card className="mb-3">
                {/* <CardHeader className="card-header-tab">
                  <div className="card-header-title font-size-lg text-capitalize fw-normal">
                    <i className="header-icon lnr-laptop-phone me-3 text-muted opacity-6"> {" "} </i>
                    Easy Dynamic Tables
                  </div>
                  <div className="btn-actions-pane-right actions-icon-btn">
                    <UncontrolledButtonDropdown>
                      <DropdownToggle className="btn-icon btn-icon-only" color="link">
                        <i className="pe-7s-menu btn-icon-wrapper" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-right rm-pointers dropdown-menu-shadow dropdown-menu-hover-link">
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem>
                          <i className="dropdown-icon lnr-inbox"> </i>
                          <span>Menus</span>
                        </DropdownItem>
                        <DropdownItem>
                          <i className="dropdown-icon lnr-file-empty"> </i>
                          <span>Settings</span>
                        </DropdownItem>
                        <DropdownItem>
                          <i className="dropdown-icon lnr-book"> </i>
                          <span>Actions</span>
                        </DropdownItem>
                        <DropdownItem divider />
                        <div className="p-3 text-end">
                          <Button className="me-2 btn-shadow btn-sm" color="link">
                            View Details
                          </Button>
                          <Button className="me-2 btn-shadow btn-sm" color="primary">
                            Action
                          </Button>
                        </div>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </div>
                </CardHeader> */}
                <CardBody>
                <DataTable data={data}
                    columns={columns}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="400px"
                  />
                </CardBody>
              </Card>
            </Row>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  )
}

export default Services;