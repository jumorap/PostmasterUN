import React, { useState } from "react";
import { Avatar, Box, Button, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Checkbox, Paper, Stack, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { TextField } from "@mui/material";

const dialogStyle = {
  position: "absolute"
}

export default function AddDependencies({ isUserAuthentified, user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
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
    alert('Dependencia agregada con éxito');
  }

  return (
    <>
        <ListItem button onClick={()=>{handleClickOpen()}}>
          <ListItemText primary={"Agregar"} sx={{paddingLeft: '55px'}}/>
          <ListItemIcon >
            <AddIcon />
          </ListItemIcon>
        </ListItem>
        <Dialog sx={dialogStyle} open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Añadir dependencia</DialogTitle>
            <DialogContent width="80%">
                <DialogContentText>
                    <Stack direction={"column"} spacing={3}>
                        <TextField
                            margin="dense" 
                            id="filled-basic" 
                            label="Nombre" 
                            variant="outlined"
                            defaultValue="Holi"
                            fullwidht
                        />

                    </Stack>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleSubmit} color="error">Guardar cambios</Button>
            </DialogActions>
        </Dialog>
    </>
  );
}

