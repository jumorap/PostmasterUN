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

const dialogStyle = {
    position: "absolute"
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
                <DialogTitle>Crear publicación</DialogTitle>
                <DialogContent width="80%">
                <DialogContentText>
                    <Stack direction={"column"} spacing={3} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Dependencia</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Dependencia"
                                onChange={e => setDependency(e.target.value)}
                            >   
                                {dependenciesData.map((text, index) => (
                                    <MenuItem key={text} value={text}>{text}</MenuItem>
                                ))}
                                
                            </Select>
                        </FormControl>
                        <TextField
                            margin="dense" 
                            id="filled-basic" 
                            label="Título" 
                            variant="outlined"
                            fullwidht
                            onChange={e => setTitle(e.target.value)}
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Descripción"
                            multiline
                            minRows={5}
                            onChange={e => setDescripcion(e.target.value)}
                        />
                        <TextField
                            margin="dense" 
                            id="filled-basic" 
                            label="Etiquetas" 
                            variant="outlined"
                            onChange={e => setTags(e.target.value)}
                        />
                        <TextField
                            margin="dense" 
                            id="filled-basic" 
                            label="Enlaces de interés" 
                            variant="outlined"
                            onChange={e => setLinks(e.target.value)}
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
        )}
