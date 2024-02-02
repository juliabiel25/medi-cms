import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useEffect, useRef, useState } from "react";

const ImageForm = ({
  onUpdate,
  onFileUpdate,
  unsaved,
  url,
  onImageDelete,
  defaultValues
}) => {
  const [fileSelected, setFileSelected] = useState(false);

  useEffect(() => {
    if (url && !fileSelected) {
      setFileSelected(true);
    }
  }, [url]);

  function updateFile(file) {
    onUpdate("image", file.name); //
    onUpdate("name", file.name);
    onFileUpdate(file);
  }

  function handleFileChange(e) {
    if (e.target.files.length > 0) {
      setFileSelected(true);
      updateFile(e.target.files[0]);
    }
  }

  return (
    <Form>
      {url && (
        <Row>
          <Col>
            <img
              src={url}
              style={{
                width: "50%",
                borderRadius: "1em"
              }}
            />
          </Col>
          {onImageDelete && (
            <Col>
              <Button color="danger" onClick={onImageDelete}>
                Usuń
              </Button>
            </Col>
          )}
        </Row>
      )}
      <FormGroup>
        <Label for="image">Wybierz plik</Label>
        <Input
          type="file"
          name="image"
          required
          id="image"
          className={unsaved.includes("image") ? "input-unsaved" : ""}
          onChange={e => handleFileChange(e)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="altName">Tekst alternatywny</Label>
        <Input
          type="text"
          disabled={!fileSelected}
          name="altName"
          defaultValue={defaultValues?.altName}
          required
          id="altName"
          className={unsaved.includes("altName") ? "input-unsaved" : ""}
          onChange={e => onUpdate("altName", e.target.value.trim())}
        />
      </FormGroup>

      <Row>
        <Col>
          <FormGroup>
            <Label for="width">Szerokość (px)</Label>
            <Input
              type="number"
              disabled={!fileSelected}
              name="width"
              required
              defaultValue={defaultValues?.width}
              id="width"
              className={unsaved.includes("width") ? "input-unsaved" : ""}
              onInput={e => onUpdate("width", e.target.value.trim())}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="height">Wysokość (px)</Label>
            <Input
              type="number"
              name="height"
              defaultValue={defaultValues?.height}
              required
              id="height"
              className={unsaved.includes("height") ? "input-unsaved" : ""}
              onInput={e => onUpdate("height", e.target.value.trim())}
              disabled={!fileSelected}
            />
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default ImageForm;
