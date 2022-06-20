import { Box, Stack, Divider, Typography, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import React, { useState, useEffect } from "react";
import { Paper} from '@mui/material'
import { dataQueryArray } from "../../../firebase/dataQuery";
import FirestoreManager from "../../../firebase/FirestoreManager";
import {getUserByEmail} from "../../../firebase/userManager";

//Firebase
import { db } from "../../../firebase/firebase.config"
import { collection, doc, getDoc, query, where, getDocs } from "firebase/firestore";


//This component set admin and colabs permissions

const dialogStyle = {
    position: "absolute"
  }



const areas = ["Cargando...", ""];
export default function SetAdminPermission({showCreatePublication, disp, isEditable = false }) {

//si showCreatePublication == false, no mostrar este componente modal, display: none
    const [elevation, setElevation] = useState(1);
    const [open, setOpen] = useState(false);
    const [loaded, setLoaded] = useState(true);

    
    const [email, setEmail] = useState('');
    const [findedUser, setFindedUser] = useState();
    const [displayUserInfo, setDisplayUserInfo] = useState(false);

    const [assignBtnLabel, setAssignBtnLabel] = useState("")
    const [assignBtnColor, setAssignBtnColor] = useState("error")

    let title = ""
    let authorizedRole = false


    if (disp == "root") {
        title = "Asignar permisos de administrador"
        authorizedRole = true

    }else if(disp == "admin"){
        title = "Agregar Colaboradores"
        authorizedRole = true
    }else {
        title = ""
        authorizedRole = false
    }


    const handleClickOpen = () => {
    setOpen(true);
    }

    const handleClose = () => {
    setOpen(false);
    }

    const handleSubmit = () => {
        setOpen(false);
        //aceptar y cerrar, asignar rol nuevo
    }

    const handleSearchUser = () => {
        // toFix, utilizar getUserByEmail(email) de userManager.js
        // const dbUser = getUserByEmail(email)
        getUserByEmail(email)
    }

    //this function should be in Firestore/userManager.js, not here
    async function getUserByEmail(email){
        const docRef = collection(db, "users")
        const q = query(docRef, where("email", "==", email ));
      
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setFindedUser(doc.data()) 
        });
      }

      //Find user
      useEffect(() => {
        console.log(findedUser)
        //refresh user UI
        if(findedUser){
            setDisplayUserInfo(true)
            
            if(findedUser.rol[0] == "admin"){
               
                setAssignBtnLabel("Quitar Permisos De Administración")
                setAssignBtnColor("error")
            }else {
                setAssignBtnLabel("Asignar Como Administrador")
                setAssignBtnColor("success")
            }
        }
      }, [findedUser])

    return(
        <>
            <Box sx={{ display: !authorizedRole && 'none'}}>
                
                <Button variant="extended" sx={{
                    textTransform: "capitalize",
                    backgroundColor: "#c0c0c0",
                    '&:hover': {
                        backgroundColor: '#82b9e7',
                    },


                }} onClick={() => {handleClickOpen()}}>

                    <AccountCircleIcon sx={{ mr: 1 }} />
                    {title}
                </Button>
            </Box>



            <Dialog sx={dialogStyle} open={open} onClose={handleClose} fullWidth>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent width="80%">
                <DialogContentText>
                    <Stack direction={"column"} spacing={3} marginBottom={2} >

                        <Typography variant="subtitle2">
                             Agregue o remueva permisos de administración o colaboración a usuarios registrados.
                             Para comenzar, ingrese el correo institucional del usuario a gestionar.
                        </Typography>

                        <TextField
                            margin="dense" 
                            id="filled-basic" 
                            label="Correo institucional" 
                            variant="outlined"
                            fullwidht
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Stack>

                        <Button variant="contained" color="error" onClick={handleSearchUser}>Buscar</Button>


                    <Stack  direction={"column"} marginBottom={2}
                            sx={{ display: !displayUserInfo && 'none'}}>


                        <Typography variant="h5">
                             Información de usuario
                        </Typography>

                        <Typography variant="subtitle1">
                             
                             Nombre: { displayUserInfo && findedUser.nombre}
                        </Typography>

                        <Typography variant="subtitle1">
                             Correo Institucional: { displayUserInfo && findedUser.email}
                        </Typography>

                        <Typography variant="subtitle1">
                             Tipo de usuario: { displayUserInfo && findedUser.rol[0]}
                        </Typography>

                        <Typography variant="h6">
                             Permisos de administrador
                        </Typography>



                    </Stack>
                        <Button sx={{ display: !displayUserInfo && 'none'}} variant="contained" color={assignBtnColor} onClick={handleSearchUser}>{assignBtnLabel}</Button>


                            





                   




                </DialogContentText>
                </DialogContent>
                <DialogActions>

                <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleSubmit} color="error">Guardar cambios</Button>
                </DialogActions>
            </Dialog>
        
        </>
        )}
