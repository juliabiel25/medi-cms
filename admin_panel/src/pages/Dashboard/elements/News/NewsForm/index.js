import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

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
import {
  createDocument,
  dbStore,
  getData,
  getDataWithReferences,
  getDocWithReferences,
  updateDocument,
  uploadFile
} from "../../../../../firebase";

import FroalaEditorComponent from "react-froala-wysiwyg";
import ImageForm from "../../ImageForm";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PageTitle from "../../../../../Layout/AppMain/PageTitle";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom";

const NewsForm = ({}) => {
  const location = useLocation();
  const history = useHistory();
  const [unsaved, setUnsaved] = useState([]);
  const updated = useRef({});
  const [fetchedData, setFetchedData] = useState({ data: {}, ref: null });
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [fetchedAuthors, setFetchedAuthors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectableCategories, setSelectableCategories] = useState([]);
  const [imageUnsaved, setImageUnsaved] = useState([]);
  const imageUpdated = useRef({});
  const imageFile = useRef();
  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    fetchData();
    fetchAuthors();
    fetchCategories();
  }, []);

  useEffect(() => {
    setSelectedCategories(fetchedData?.data?.categories?.data ?? []);
  }, [fetchedData]);

  useEffect(() => {
    setSelectableCategories(
      fetchedCategories.filter(cat =>
        selectedCategories.constructor === Array
          ? !selectedCategories
              ?.map(c => c.data?.name)
              .includes(cat?.data?.name)
          : []
      )
    );
  }, [selectedCategories]);

  // if no 'doctor.current.' obejct was detected then you likely reached this page without using the designated UI!
  // go back to the 'doctor.current.' page
  const news = useRef(location?.state?.news);
  if (!news.current) {
    history.push("/dashboard/news");
    return;
  }

  async function fetchData() {
    const fetched = await getDocWithReferences(dbStore, news.ref);
    console.log("fetched news article:", fetched);
    setFetchedData(fetched);
  }

  async function fetchAuthors() {
    const fetched = await getDataWithReferences(dbStore, "authors");
    console.log("fetched authors:", fetched);
    setFetchedAuthors(fetched);
  }

  async function fetchCategories() {
    const fetched = await getDataWithReferences(dbStore, "categories");
    console.log("fetched categories:", fetched);
    setFetchedCategories(fetched);
  }

  function updateData(field, e, newDoc = false) {
    console.log("update field " + field + ": ", e?.target?.value ?? e);

    // assume that if "e" doesn't have a .target property = it's actually just the new value to be saved ^^'
    if (!e.target && !newDoc) {
      // save field as unsaved
      if (!unsaved.includes(field)) {
        setUnsaved(prev => [...prev, field]);
      }
      // update the current input state (value to be sent to firestore -- so just a ref or an empty array is needed here)
      if (e.constructor === Array) {
        updated.current[field] = e ?? [];
      } else {
        updated.current[field] = e ?? null;
      }

      // update the display state for selected items
      setSelectedCategories(e);
      return;
    }

    updated.current = { ...updated.current, [field]: e.target.value };
    if (e.target.value) {
      // save field as unsaved
      if (!unsaved.includes(field)) {
        setUnsaved(prev => [...prev, field]);
      }
    } else {
      // if value was updated back to the original value -> remove field from unsaved
      setUnsaved(prev => prev.filter(item => item !== field));
    }
  }

  function updateImageData(field, value) {
    // if new value is empty --> erase unsaved field styling
    if (!value) {
      setImageUnsaved(prev => prev.filter(item => item !== field));
      return;
    }
    // save field as unsaved
    if (!imageUnsaved.includes(field)) {
      setImageUnsaved(prev => [...prev, field]);
    }
    imageUpdated.current[field] = value;
  }

  function updateFile(file) {
    updateData("image", file);
    imageFile.current = file;
  }

  async function submitData() {
    if (unsaved.length > 0 || imageUnsaved.length > 0) {
      console.log(
        "updating to value from updated: ",
        updated.current["categories"]
      );
      const dataToSubmit = {};
      unsaved.forEach(field => (dataToSubmit[field] = updated.current[field]));

      // upload image file to storage
      if (imageFile.current) {
        console.log("FILE", imageFile.current);
        const result = await uploadFile(imageFile.current);
        const url = result?.url;

        // create new image document in firestore and save document reference
        let createDocData = {};
        if (imageUpdated.current.name)
          createDocData["name"] = imageUpdated.current.name;
        if (imageUpdated.current.altName)
          createDocData["altName"] = imageUpdated.current.altName;
        if (imageUpdated.current.width)
          createDocData["width"] = imageUpdated.current.width;
        if (imageUpdated.current.height)
          createDocData["height"] = imageUpdated.current.height;

        console.log("createDocData", createDocData);
        const imageRef = await createDocument(dbStore, "images", {
          ...createDocData,
          url
        });
        // overwrite image property with document reference
        dataToSubmit["image"] = imageRef;
        console.log("final dataToSubmit: ", dataToSubmit);
      }

      console.log("updateDoc: ", news.ref);
      console.log("dataToSubmit: ", dataToSubmit);
      // create new doctor document
      await updateDocument(
        dbStore,
        ...`${news.ref.path}`.split("/"),
        dataToSubmit
      );
      history.push("/dashboard/news");
    }
  }

  console.log(
    "cat default: ",
    fetchedData?.data?.categories?.data.map(el => el.ref)
  );
  console.log("author default: ", fetchedData?.data?.author);

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
              heading="Edytuj artykuł"
              icon="pe-7s-news-paper icon-gradient bg-premium-dark"
            />
            <Container fluid>
              <Row>
                <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Grafika</CardTitle>
                    <ImageForm
                      url={fetchedData?.data?.image?.data?.url}
                      onUpdate={updateImageData}
                      onFileUpdate={updateFile}
                      unsaved={imageUnsaved}
                    />
                  </CardBody>
                </Card>
                {/* <Card className="main-card mb-3">
                  <CardBody>
                    <CardTitle>Dane artykułu</CardTitle>
                    <Form
                      onSubmit={e => {
                        e.preventDefault();
                      }}
                    >
                      <FormGroup>
                        <Label for="title">Tytuł</Label>
                        <Input
                          type="text"
                          name="title"
                          id="title"
                          className={
                            unsaved.includes("title") ? "input-unsaved" : ""
                          }
                          defaultValue={fetchedData?.data.title}
                          onChange={e => updateData("title", e)}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="text">Treść</Label>
                        <FroalaEditorComponent tag="textarea" />
                      </FormGroup>

                      <FormGroup>
                        <Label for="author">Autor</Label>
                        <Select
                          id="author"
                          name="author"
                          closeMenuOnSelect={true}
                          defaultValue={fetchedData?.ref}
                          options={fetchedAuthors}
                          isClearable
                          onChange={newValue => {
                            if (newValue) {
                              updateData("author", newValue?.ref ?? null);
                            }
                          }}
                          getOptionValue={option => option.ref}
                          getOptionLabel={option =>
                            option.data?.name + " " + option.data?.surname
                          }
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="categories">Kategorie</Label>
                        <Select
                          id="categories"
                          name="categories"
                          closeMenuOnSelect={false}
                          components={makeAnimated()}
                          defaultValue={fetchedData?.data?.categories?.data.map(
                            el => el.ref
                          )}
                          isMulti
                          options={fetchedCategories}
                          // onKeyDown={e => {
                          //   if (e.code === "Enter" && selectableCategories) {
                          //     // console.log("UWU e", e.target?.value);
                          //     updateData("categories", e, true);
                          //   }
                          // }}
                          onChange={newValue => {
                            console.log(
                              "cat new vcalue:",
                              newValue.map(cat => cat?.ref)
                            );
                            updateData(
                              "categories",
                              newValue.map(cat => cat?.ref)
                            );
                          }}
                          getOptionValue={option => option?.ref}
                          getOptionLabel={option => option.data?.name}
                        />
                      </FormGroup>

                      <Button
                        color="primary"
                        className="mt-1"
                        onClick={submitData}
                        disabled={
                          unsaved.length === 0 && imageUnsaved.length === 0
                        }
                      >
                        Zapisz zmiany
                      </Button>
                    </Form>
                  </CardBody>
                </Card> */}
              </Row>
            </Container>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </Fragment>
  );
};

export default NewsForm;
