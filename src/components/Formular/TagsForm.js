import React from "react";
import PropTypes from "prop-types";
import Container from "./Container";
import ElementsBar from "./ElementsBar";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";

function TagsForm({ tags, handleTagDelete, handleTagAdd }) {
  const [currTag, setCurrTag] = React.useState("");

  const [tagOptions, setTagOptions] = React.useState([
    { name: "tag1", label: "Tag 1" },
    { name: "tag2", label: "Tag 2" },
    { name: "tag3", label: "Tag 3" },
  ]);

  function handleButtonClick() {
    handleTagAdd(currTag);
    setCurrTag("");
  }

  return (
    <Container name = "Etiquetas">
      {/* Visualice and delete tags*/}
      <ElementsBar list={tags} handleTagDelete={handleTagDelete} emptyMessage = "Por favor añadir una etiqueta"/>

      <Stack direction={"column"} spacing={3}>
        {/* Add new tags */}
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={tagOptions}
          onChange={(_, value) => setCurrTag(value.label)}
          value={currTag}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Etiquetas"
              value={currTag}
              onChange={(e) => setCurrTag(e.target.value)}
                variant="filled"
            />
          )}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleButtonClick}
        >
          Agregar etiqueta
        </Button>
      </Stack>
    </Container>
  );
}

TagsForm.propTypes = {};

export default TagsForm;
