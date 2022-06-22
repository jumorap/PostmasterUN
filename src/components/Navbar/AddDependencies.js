import React, { useState } from "react";
import { Button, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { TextField } from "@mui/material";
import { addDependency } from "../../../firebase/dataUpdate";

const dialogStyle = {
  position: "absolute"
}

export default function AddDependencies({ isUserAuthentified, user, setLoaded, disp}) {
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
        <hr/>
        <ListItem button onClick={()=>{handleClickOpenDialog()}} sx={{display: !disp && "none"}}>
          <ListItemText primary={"Agregar dependencia"} sx={{paddingLeft: '30px', paddingRight: '120px'}}/>
          <ListItemIcon sx={{"&:hover": {color:"#c20000"}}}>
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

