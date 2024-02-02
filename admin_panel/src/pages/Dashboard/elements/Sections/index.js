import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  Tooltip,
  UncontrolledButtonDropdown
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  dbStore,
  deleteDocument,
  getDataWithReferences
} from "../../../../firebase";

import DataTable from "react-data-table-component";
import PageTitleCustom from "../../../../Layout/AppMain/PageTitleCustom";

const RowActions = ({ row, db, handleDelete }) => {
  const [editTooltipOpen, setEditTooltipOpen] = useState(false);
  const [deleteTooltipOpen, setDeleteTooltipOpen] = useState(false);

  return (
    <div style={{ padding: "0" }}>
      <Link
        to={{
          pathname: "/dashboard/sections/edit",
          state: { section: row }
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
          Edytuj sekcję
        </Tooltip> */}
      </Link>

      {/* <Button
        className="btn-pill btn-icon-only"
        // id={`${row.data.id}-action-delete`}
        color="danger"
        onClick={handleDelete}
      >
        <i className="pe-7s-trash btn-icon-wrapper"> </i>
      </Button> */}
      {/* <Tooltip
        className="tooltip-light"
        placement={"bottom"}
        isOpen={deleteTooltipOpen}
        target={`${row.data.id}-action-delete`}
        toggle={() => setDeleteTooltipOpen(prev => !prev)}
      >
        Usuń sekcję
      </Tooltip> */}
    </div>
  );
};

const Sections = ({}) => {
  // type:: {data: {}, ref: {}} []
  const [fetchedData, setFetchedData] = useState([]);
  const updated = useRef({});
  const [unsaved, setUnsaved] = useState([]);
  const history = useHistory();

  async function fetchData() {
    const fetched = await getDataWithReferences(dbStore, "sections");
    console.log("fetched sections:", fetched);
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
      name: "Widoczność",
      // selector: row => row.data.isByDefault,
      cell: (row, index, column, id) => (<Input type="checkbox" checked={row?.data?.isByDefault} disabled />),
      sortable: true
    },
    {
      name: "Pozycja",
      selector: row =>
        row.data.position,
      sortable: true
    }
  ];

  function handleAddSection() {
    history.push("/dashboard/sections/new");
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
              heading="Sekcje"
              buttons={[]}
              // buttons={[
              //   {
              //     name: "Dodaj sekcję",
              //     color: "success",
              //     onClick: handleAddService,
              //     className: ""
              //   }
              // ]}
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

export default Sections;
