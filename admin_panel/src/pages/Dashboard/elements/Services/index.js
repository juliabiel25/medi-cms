import {
  Button,
  Tooltip,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledButtonDropdown
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Link, useHistory } from "react-router-dom";

import DataTable from "react-data-table-component";
import { Fragment, useRef, useState, useEffect } from "react";
import {
  dbStore,
  deleteDocument,
  getDataWithReferences
} from "../../../../firebase";
import PageTitleCustom from "../../../../Layout/AppMain/PageTitleCustom";

const RowActions = ({ row, db, handleDelete }) => {
  const [editTooltipOpen, setEditTooltipOpen] = useState(false);
  const [deleteTooltipOpen, setDeleteTooltipOpen] = useState(false);

  return (
    <div style={{ padding: "0" }}>
      <Link
        to={{
          pathname: "/dashboard/services/edit",
          state: { service: row }
        }}
      >
        <Button
          className="me-1 btn-pill btn-icon-only"
          color="primary"
          // id={`${row.data.id}-action-edit`}
        >
          <i className="pe-7s-pen btn-icon-wrapper"> </i>
        </Button>
        {/* <Tooltip
          className="tooltip-light"
          placement={"bottom"}
          isOpen={editTooltipOpen}
          target={`${row.data.id}-action-edit`}
          toggle={() => setEditTooltipOpen(prev => !prev)}
        >
          Edytuj usługę
        </Tooltip> */}
      </Link>

      <Button
        className="btn-pill btn-icon-only"
        // id={`${row.data.id}-action-delete`}
        color="danger"
        onClick={handleDelete}
      >
        <i className="pe-7s-trash btn-icon-wrapper"> </i>
      </Button>
      {/* <Tooltip
        className="tooltip-light"
        placement={"bottom"}
        isOpen={deleteTooltipOpen}
        target={`${row.data.id}-action-delete`}
        toggle={() => setDeleteTooltipOpen(prev => !prev)}
      >
        Usuń usługę
      </Tooltip> */}
    </div>
  );
};

const Services = ({}) => {
  // type:: {data: {}, ref: {}} []
  const [fetchedData, setFetchedData] = useState([]);
  const updated = useRef({});
  const [unsaved, setUnsaved] = useState([]);
  const history = useHistory();

  async function fetchData() {
    const fetched = await getDataWithReferences(dbStore, "services");
    console.log("fetched services:", fetched);
    setFetchedData(fetched);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(row, db) {
    console.log("delete", row);
    await deleteDocument(db, row.ref);
    fetchData();
  }

  const columns = [
    {
      name: "Akcje",
      cell: (row, index, column, id) => (
        <RowActions row={row} handleDelete={() => handleDelete(row, dbStore)} />
      ),
      sortable: false,
      button: true
    },
    {
      name: "Nazwa",
      selector: row => row.data.name,
      sortable: true
    },
    {
      name: "Opis",
      selector: row => row.data.description,
      sortable: true
    },
    {
      name: "Lekarz",
      selector: row =>
        row?.data?.doctorRef?.data?.name +
        " " +
        row?.data?.doctorRef?.data?.surname,
      sortable: true
    },
    {
      name: "Wydział",
      selector: row => row?.data?.departmentRef?.data?.name,
      sortable: true
    },
    {
      name: "Cena brutto",
      selector: row => row.data.grossPrice,
      sortable: true
    },
    {
      name: "VAT",
      selector: row => row.data.vat,
      sortable: true
    }
  ];

  function handleAddService() {
    history.push("/dashboard/services/new");
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
              heading="Usługi"
              buttons={[
                {
                  name: "Dodaj usługę",
                  color: "success",
                  onClick: handleAddService,
                  className: ""
                }
              ]}
              icon="pe-7s-eyedropper icon-gradient bg-premium-dark"
            />
            <Row>
              <Card className="mb-3">
                <CardBody>
                  <DataTable
                    data={fetchedData}
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
  );
};

export default Services;
