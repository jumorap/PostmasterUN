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
import LinksForm from "./LinksForm";
import TagsForm from "./TagsForm";

export default function Formular() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [links, setLinks] = React.useState([]);

  const handleTagDelete = (tag) => {
    setTags(tags.filter((item) => item.name !== tag.name));
  };

  const handleTagAdd = (currTag) => {
    if (currTag.length > 0 && !tags.find((item) => item.name === currTag)) {
      setTags([...tags, { name: currTag }]);
    }
  };

  const handleLinkDelete = (link) => {
    setLinks(links.filter((item) => item.url !== link.url));
  };

  const handleLinkAdd = (currLink, currUrl) => {
    if (currLink.length > 0 && !links.find((item) => item.url === currUrl)) {
      setLinks([...links, { url: currUrl, name: currLink }]);
    }
  };

  console.log();

  return (
    <Stack direction={"column"} spacing={3}>
      <TextField
        id="filled-basic"
        label="Titulo"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Descripcion"
        multiline
        minRows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <TagsForm
        handleTagDelete={handleTagDelete}
        handleTagAdd={handleTagAdd}
        tags={tags}
      />
      <LinksForm
        links={links}
        handleLinkDelete={handleLinkDelete}
        handleLinkAdd={handleLinkAdd}
      />
    </Stack>
  );
}
