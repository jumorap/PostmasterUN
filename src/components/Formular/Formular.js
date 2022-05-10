import styled from "@emotion/styled";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import TagsForm from "./TagsForm";


export default function Formular() {
  const [tags, setTags] = React.useState([]);

  const handleTagDelete = (tag) => {
    setTags(tags.filter((item) => item.name !== tag.name));
  };

  const handleTagAdd = (currTag) => {
    if (currTag.length > 0 && !tags.find((item) => item.name === currTag)) {
      setTags([...tags, { name: currTag }]);
    }
  };

  return (
    <Stack direction={"column"} spacing={3}>
      <TextField id="filled-basic" label="Titulo" variant="outlined" />
      <TextField
        id="outlined-multiline-flexible"
        label="Descripcion"
        multiline
        minRows={5}
      />

      <TagsForm handleTagDelete = {handleTagDelete} handleTagAdd = {handleTagAdd} tags = {tags}/>
    </Stack>
  );
}
