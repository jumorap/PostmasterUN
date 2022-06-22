import styled from "@emotion/styled";
import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import LinksForm from "./LinksForm";
import TagsForm from "./TagsForm";
import { Editor, EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import TextEditor from "./TextEditor";
import FirestoreManager from "../../../firebase/FirestoreManager";
import DropZone from "./DropZone";
import Container from "./Container";

export default function Formular() {
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const [links, setLinks] = React.useState([]);
  const [fileList, setfileList] = React.useState([]);
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  console.log(editorState)

  const handleTagDelete = (tag) => {
    setTags(tags.filter((item) => item.name !== tag.name));
  };

  const handleTagAdd = (currTag) => {
    if (currTag.length > 0 && !tags.find((item) => item.name === currTag)) {
      setTags([...tags, { name: currTag }]);
    }
  };

  const handleLinkDelete = (link, index) => {
    setLinks(links.filter((item) => item.url !== link.url));
  };

  const handleLinkAdd = (currLink, currUrl) => {
    if (currLink.length > 0 && !links.find((item) => item.url === currUrl)) {
      setLinks([...links, { url: currUrl, name: currLink }]);
    }
  };

  /**
   * Funcion para subir el formulario a la base de datos
   */
  const upload = () => {
    console.log(editorState)
    const description = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    //FirestoreManager.addPost(title, tags, links, description, "0", fileList);
  };

  return (
    <Stack direction={"column"} spacing={3}>
      <TextField
        id="filled-basic"
        label="Titulo"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Container name="descripcion">
        <TextEditor editorState={editorState} setEditorState={setEditorState} />
      </Container>

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

      <Container name="Imagenes">
        <DropZone const fileList={fileList} setfileList={setfileList} />
      </Container>
      <Button color="error" variant="contained" onClick={upload}>
        Subir
      </Button>
    </Stack>
  );
}
