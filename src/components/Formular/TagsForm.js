import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Container from "./Container";
import ElementsBar from "./ElementsBar";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import FirestoreManager from "../../../firebase/FirestoreManager";

function TagsForm({ tags, handleTagDelete, handleTagAdd }) {
  const [currTag, setCurrTag] = React.useState({name:"", id : null});

  const [tagOptions, setTagOptions] = React.useState([]);

  useEffect(() => {
    async function setTags(){
      const tags = await FirestoreManager.getTagsList()
      setTagOptions(tags)
    }
    setTags()
  }, [])
  

  function handleButtonClick() {
    handleTagAdd(currTag.name);
    setCurrTag({name:""});
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
          onChange={(_, value) => setCurrTag(value)}
          value={currTag}
          getOptionLabel={(v)=>v.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Etiquetas"
              value={currTag}
              onChange={(e) => setCurrTag({...currTag ,name: e.target.value})}
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
