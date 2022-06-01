import React, { useRef, useState } from "react";
import { Avatar, Box, Button, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Checkbox, Paper, Stack, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { TextField } from "@mui/material";
import { addDependency } from "../../../firebase/dataUpdate";

const dialogStyle = {
  position: "absolute"
}

export default function AddDependencies({ isUserAuthentified, user, setLoaded, disp}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [elevation, setElevation] = useState(1);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpenDialog = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = () => {
    setOpen(false);
    addDependency(input);
    setLoaded(false);
  }

  return (
    <>
        <ListItem button onClick={()=>{handleClickOpenDialog()}} sx={{background: 'rgba(0, 0, 0, 0.1);', display: !disp && "none"}}>
          <ListItemText primary={"Agregar dependencia"} sx={{paddingLeft: '55px', paddingRight: '120px'}}/>
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
                            onChange={e => setInput(e.target.value)}
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

