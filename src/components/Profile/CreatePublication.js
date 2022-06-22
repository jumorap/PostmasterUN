import { Box, Stack, Typography, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import React, { useState, useEffect } from "react";
import { Paper} from '@mui/material'
import { dataQueryArray } from "../../../firebase/dataQuery";
import FirestoreManager from "../../../firebase/FirestoreManager";
import { addPost } from "../../../firebase/dataUpdate";
import { Admin } from "../../sections"

import { firebaseAppAuth } from "../../../firebase/firebase.config";
import {getUser} from "../../../firebase/userManager";

const dialogStyle = {
    position: "abslute",
    padding: "5px"
  }

// import {setPublication} from "../../../firebase/userManager"
const areasFull = [
    "Postmaster",
    "DRE",
    "Bienestar",
    "Decanatura y Vicedecanatura",
    "Dirección académica",
    "DNINFOA",
    "OTIC",
    "Facultades",
    "RevistaUN",
    "Unimedios",
    "Bibliotecas",
    "Grupos estudiantiles",
  ];

  const areas = ["Cargando...", ""];
export default function CreatePublication({showCreatePublication, disp, isEditable = false }) {

//si showCreatePublication == false, no mostrar este componente modal, display: none
    const [elevation, setElevation] = useState(1);
    const [open, setOpen] = useState(false);
    const [loaded, setLoaded] = useState(true);
    const [dependenciesData, setDependenciesData] = useState(areas);
    const [dependency, setDependency] = React.useState('');
    const [title, setTitle] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tags, setTags] = useState('');
    const [links, setLinks] = useState('');

      // Get User Information
        const [userDeps, setUserDeps] = useState([["Dependencias no disponibles"]]);
        const [userRole, setUserRole] = useState("root");

     /*Firebase methods */
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

    const handleClickOpen = () => {
    setOpen(true);
    }

    const handleClose = () => {
    setOpen(false);
    }

    const handleSubmit = () => {
        setOpen(false);
        addPost(dependency, title, descripcion, tags, links)
    }

    useEffect(() => {
    const mapDependencies = async () => {
        dataQueryArray(FirestoreManager.getDependenciesList()).then((data) => {
        const dataArray = data.map((item) => item.name);
        setDependenciesData(dataArray);
        });
    };

    if (loaded){
        mapDependencies();
    }
    return ()=>{
        setLoaded(false);
    }   
    }, [loaded]);


    useEffect(() => {
        firebaseAppAuth.onAuthStateChanged((user) => {
            if (user) {
                //if user is auth, then find role
                const dbUser = getUser(user.uid)
                dbUser.then(res => {
                    //verify if user field rol is admin or root
                    //TODO: create feature for colab

                    const myUser = res.data()

                    const role = myUser.rol[0]
                    if(role === "admin" || role === "colab"){
                        const deps = myUser.dependenciasAdmin
                        setUserDeps(deps)
                    }
                    setUserRole(role)
                })

            }
        })
    }, []);

    function close() {
        setOpen(false)
    }

    return(
        <>
            <Box sx={{
                display: !disp && 'none',
                position: "fixed",
                justifyContent: "flex-end",
                bottom: 40,
                right: 40
            }}>
                
                <Fab variant="extended" onClick={() => {handleClickOpen()}}>
                    <NewspaperIcon sx={{ mr: 1 }} />
                    Publicar
                </Fab>
            </Box>
            <Dialog sx={dialogStyle} open={open} onClose={handleClose} fullWidth>
                <Admin close={close} />
            </Dialog>
        
        </>
        )}
