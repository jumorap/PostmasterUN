import React, { useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Dialog, DialogTitle, DialogActions } from "@mui/material";
import { deleteDependency } from "../../../firebase/dataUpdate";

import AlertsCrud from "../Alertscrud/AlertsCrud";


export default function EditDependencies({ isUserAuthentified, user, dependencyName, setLoaded}) {
    const [open, setOpen] = useState(false);
    const [alertCrud, setAlertCrud] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleDelete = () => {
        setOpen(false);
        deleteDependency(dependencyName)
        setLoaded(false);
        setAlertCrud(true);

        // wait for the alert to be closed
        setTimeout(() => setAlertCrud(false), 3000);
    }
    return (
        <>
            <IconButton>
                <DeleteIcon fontSize="small" onClick={()=>{handleClickOpen()}}/>
            </IconButton>


            <Dialog sx={{position: "absolute"}} open={open} onClose={handleClose} fullWidth>
                <DialogTitle>¿Desea eliminar esta dependencia definitivamente?</DialogTitle>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
                    <Button variant="contained" onClick={handleDelete} color="error">Eliminar</Button>
                </DialogActions>
            </Dialog>

            <Dialog sx={{position: "absolute"}} open={alertCrud}>
                {/* Show alert when delete dependency */}
                <AlertsCrud message={"Dependencia eliminada correctamente"}/>
            </Dialog>
        </>
    );
}

