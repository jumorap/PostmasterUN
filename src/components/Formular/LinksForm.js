import { Button, TextField } from "@mui/material";
import React from "react";
import Container from "./Container";
import ElementsBar from "./ElementsBar";

export default function LinksForm({ links, handleLinkDelete, handleLinkAdd }) {

  const [currLink, setCurrLink] = React.useState("");
  const [currUrl, setCurrUrl] = React.useState("");

  function handleButtonClick(){
    handleLinkAdd(currLink, currUrl);
    setCurrLink("");
    setCurrUrl("");
  }


  return (
    <Container name={"Links"}>
      <ElementsBar
        list={links}
        handleTagDelete={handleLinkDelete}
        emptyMessage="Porfavor añadir un Link"
      />
      <TextField id="filled-basic" label="Leyenda" variant="filled" value={currLink} onChange = {(e)=>setCurrLink(e.target.value)} />
      <TextField id="filled-basic" label="URL" variant="filled" value={currUrl} onChange = {(e)=>setCurrUrl(e.target.value)}/>
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Agregar Link
      </Button>
    </Container>
  );
}
