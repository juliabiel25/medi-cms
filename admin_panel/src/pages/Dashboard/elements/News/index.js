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
          pathname: "/dashboard/news/edit",
          state: { news: row }
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

const News = ({}) => {
  // type:: {data: {}, ref: {}} []
  const [fetchedData, setFetchedData] = useState([]);
  const updated = useRef({});
  const [unsaved, setUnsaved] = useState([]);
  const history = useHistory();

  async function fetchData() {
    const fetched = await getDataWithReferences(dbStore, "news");
    console.log("fetched news:", fetched);
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
      name: "Tytuł",
      selector: row => row.data.title,
      sortable: true
    },
    {
      name: "Data",
      selector: row => row.data.date,
      sortable: true
    },
    {
      name: "Autor",
      selector: row =>
        row?.data?.author?.data?.name + " " + row?.data?.author?.data?.surname,
      sortable: true
    }
  ];

  function handleAddNews() {
    history.push("/dashboard/news/new");
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
              heading="Artykuły"
              buttons={[
                {
                  name: "Dodaj artykuł",
                  color: "success",
                  onClick: handleAddNews,
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

export default News;
