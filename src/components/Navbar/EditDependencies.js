import React, { useState } from "react";
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Stack, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { TextField } from "@mui/material";
import { editDependency } from "../../../firebase/dataUpdate";
import AlertsCrud from "../Alertscrud/AlertsCrud";

const dialogStyle = {
    position: "absolute"
  }

export default function EditDependencies({ isUserAuthentified, user, dependencyName, setLoaded}) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [alertCrud, setAlertCrud] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = () => {
        setOpen(false);
        editDependency(dependencyName, input)
        setLoaded(false);
        setAlertCrud(true);

        // wait for the alert to be closed
        setTimeout(() => setAlertCrud(false), 3000);
    }

    return (
        <>
            <IconButton sx={{"&:hover": {color:"#c20000"}}}>
                <EditIcon fontSize="small" onClick={()=>{handleClickOpen()}}/>
            </IconButton>
            <Dialog sx={dialogStyle} open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Editar nombre de dependencia</DialogTitle>
                <DialogContent width="80%">
                    <DialogContentText>
                        <Stack direction={"column"} spacing={3}>
                            <TextField
                                margin="dense"
                                id="filled-basic"
                                label="Nombre"
                                variant="outlined"
                                defaultValue={dependencyName}
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

            <Dialog sx={{position: "absolute"}} open={alertCrud}>
                {/* Show alert when delete dependency */}
                <AlertsCrud message={"Dependencia eliminada correctamente"}/>
            </Dialog>
        </>
    );
}

