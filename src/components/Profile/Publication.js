import { Favorite, FavoriteBorder } from "@mui/icons-material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { Checkbox, Paper, Stack, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Proptypes from "prop-types";
import { Timestamp } from "firebase/firestore";
import FavoriteButton from "../InformationCard/FavoriteButton";

const dialogStyle = {
  position: "absolute"
}


export default function Publication({ title, description, date, onClick, isEditable = false, postId }) {
  const [elevation, setElevation] = useState(1);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = () => {
    setOpen(false);
    alert('Publicación modificada con éxito');
  }

  return (
    <div>
      <Paper
        elevation={elevation}
        sx={{ p: 2, position: "relative" }}
        onMouseOver={() => setElevation(4)}
        onMouseOut={() => setElevation(1)}
      >
        <Stack direction={"row"} spacing={2} justifyContent="space-between">
          <Box sx={{ cursor: "pointer" }} onClick={onClick}>
            <Typography sx={{fontSize: "1.5em", fontWeight: "bold"}} paddingLeft={2} paddingTop={1}>{title}</Typography>
            {/* <Typography padding={2} variant="body2">{"fecha pendiente Date"}</Typography> */}
            <Typography paddingLeft={2} paddingBottom={1} variant="body1">{description}</Typography>
          </Box>
          <Box display={"flex"} alignItems="center">
            <FavoriteButton postId={postId} defaultChecked = {true}/>
            {
              isEditable && (
                <IconButton aria-label="edit">
                  <EditOutlinedIcon onClick={()=>{handleClickOpen()}}/>
                </IconButton>
              )
            }
          </Box>
        </Stack>
      </Paper>
      <Dialog sx={dialogStyle} open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Editar publicación</DialogTitle>
        <DialogContent width="80%">
          <DialogContentText>
            <Stack direction={"column"} spacing={3}>
              <TextField
                margin="dense" 
                id="filled-basic" 
                label="Título" 
                variant="outlined"
                defaultValue={title}
                fullwidht
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Descripción"
                multiline
                minRows={5}
                defaultValue={description}
              />
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit} color="error">Guardar cambios</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


Publication.propTypes = {
  title: Proptypes.string,
  description: Proptypes.string,
  date: Proptypes.string,
  onClick: Proptypes.func,
}