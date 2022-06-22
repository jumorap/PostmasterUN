import { Box, FormGroup, Alert, FormControlLabel, Stack, Divider, Typography, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
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
import { collection, doc, getDoc, query, where, getDocs, updateDoc, arrayUnion } from "firebase/firestore";



//This component set admin and colabs permissions

const dialogStyle = {
    position: "absolute"
  }



const areas = ["Cargando...", ""];
export default function SetColabPermission({showCreatePublication, disp, isEditable = false, id}) {

//si showCreatePublication === false, no mostrar este componente modal, display: none
    const [elevation, setElevation] = useState(1);
    const [open, setOpen] = useState(false);
    const [loaded, setLoaded] = useState(true);
    
    const [email, setEmail] = useState('');
    const [findedUser, setFindedUser] = useState({rol: ["estudiante"]});
    const [displayUserInfo, setDisplayUserInfo] = useState(false);

    const [selectedDeps,setSelectedDeps] = useState([]);
    const [findenDeps, setFindenDeps] = useState(areas);

    const [checkedDep,setCheckedDep] = useState(false)
    const [show, setShow] = useState(false);

    var mySelectedDeps = []

    const [dependenciesData, setDependenciesData] = useState(areas);

    let title = ""
    let authorizedRole = false


    if (disp === "admin") {
        title = "Asignar permisos de colaboración"
        authorizedRole = true
    }

    const handleClickOpen = () => {
    
    setDisplayUserInfo(false)
    setOpen(true);
    }

    const handleClose = () => {
    setOpen(false);
    }

    const handleSubmit = () => {
        
        if(findedUser.rol[0] !== "colab"){
            setUserRole("colab")
        }
        setUserDeps(selectedDeps)

        setDisplayUserInfo(false)
        setShow(true)
        setOpen(false);
        
    }

    const handleSetStudent = () => {
        if(findedUser.rol[0] === "colab"){
            setUserRole("estudiante")
        }
        setSelectedDeps([])
        setUserDeps([])

        setDisplayUserInfo(false)
        setShow(true)
        setOpen(false);
    }

    const handleSearchUser = () => {
        
        getUserByEmail(email)
    }

    const handleCheckboxChange = (dep) => {
   
            let checked = event.target.checked
            let temp = [...selectedDeps]

            if(checked === true){

                if(!temp.includes(dep)){
                    temp.push(dep)
                }

                setSelectedDeps(temp)
                handleCheckedDep(dep)
            }else{
                
                if(temp.includes(dep)){
                    //quitarla
                   const index = temp.findIndex(e => e === dep )

                   temp.splice(index,1)
                }
                setSelectedDeps(temp)
                handleCheckedDep(dep)
            }

        
    }

    const handleCheckedDep = (dep)=>{
        if(selectedDeps.includes(dep)){

            return true
        }else{
            return false
        }
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

      //this function should be in Firestore/userManager.js, not here
      async function setUserDeps(deps){
        const userRef = doc(db, "users", findedUser.id);
        
        deps.forEach((upd) => {
            updateDoc(userRef, {
                dependenciasAdmin: arrayUnion(upd)
              });
        })
        
      }

      async function setUserRole(rol){
        const userRef = doc(db, "users", findedUser.id);

        await updateDoc(userRef, {
          rol: [rol]
        });
      }

       //this function should be in Firestore/userManager.js, not here
    async function getMyDependencies(id){
        const userRef = collection(db, "users");
        const userSnap = query(userRef, where("id", "==", id));
        const deps = [];
        var docs = 0;  
        const querySnapshot = await getDocs(userSnap);

        querySnapshot.forEach((doc) => {
            docs = doc.data()
        });
        
        for (let i = 0; i < docs.dependenciasAdmin.length; i++) {
            deps.push(docs.dependenciasAdmin[i])
        }
      
        return deps;
      }

      //list dependencies
      useEffect(() => {
        
        const mapDependencies = async () => {
            getMyDependencies(id).then((data) => {
                const dataArray = data.map((item) => item);
                setDependenciesData(dataArray);
                });
            
            dataQueryArray(FirestoreManager.getDependenciesList()).then((data) => {
                const dataArray = data.map((item) => item.name);
                setFindenDeps(dataArray);
                });
            
        };
    
        if (loaded){
            mapDependencies();
            
        }
        return ()=>{
            setLoaded(false);
        }   
        }, [loaded]);

      
      //Find user
      useEffect(() => {
       

        //refresh user UI
        if(findedUser){
            setDisplayUserInfo(true)
            mySelectedDeps = []
            
            if(findedUser.rol[0] === "admin"){
                //filtrar dependencias asigandas
                for (let i = 0; i < findenDeps.length; i++) {
                    for (let j = 0; j < findedUser.dependenciasAdmin.length; j++) {
                        if(findenDeps[i] === findedUser.dependenciasAdmin[j]){
                                mySelectedDeps.push(findenDeps[i])
                        }
                        
                    }
                }
            }
            setSelectedDeps(mySelectedDeps)
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

                <Alert  onClose={() => {setShow(false)}} sx={{ display: !show && 'none', width: "100%" }}
                severity="success">  Cambios guardados correctamente
                </Alert>

            </Box>

            <Dialog sx={dialogStyle} open={open} onClose={handleClose} fullWidth>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent width="80%">
                <DialogContentText>
                    <Stack direction={"column"} spacing={3} marginBottom={2} >

                        <Typography variant="subtitle2">
                             Agregue o remueva permisos de colaboración a usuarios registrados.
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
                    <Divider sx={{padding:"8px"}}/>

                    <Stack  direction={"column"} marginBottom={2}
                            sx={{ display: !displayUserInfo && 'none'}}>


                        <Typography variant="h6" sx={{paddingTop: "10px"}}>
                             Información de usuario
                        </Typography>

                        <Typography variant="subtitle2" sx={{paddingLeft: "10px"}}>
                             
                             Nombre: { displayUserInfo && findedUser.nombre}
                        </Typography>

                        <Typography variant="subtitle2" sx={{paddingLeft: "10px"}}>
                             Correo Institucional: { displayUserInfo && findedUser.email}
                        </Typography>

                        <Typography variant="subtitle2" sx={{paddingLeft: "10px"}}>
                             Tipo de usuario: { displayUserInfo && findedUser.rol[0]}
                        </Typography>

                        <Typography variant="h6" sx={{paddingTop: "10px"}}>
                             Permisos de colaboración:
                        </Typography>

                        <Typography variant="subtitle2" sx={{paddingLeft: "10px"}}>
                             Seleccione las dependencias en las que colaborará este usuario:
                        </Typography>

                        <Typography  variant="subtitle2" sx={{paddingLeft: "10px"}}>
                             
                            <FormGroup >
                                {

                                dependenciesData.map((dep,index) => (                     
                                        <FormControlLabel
                                            key={index}
                                            control={ <Checkbox /> }
                                            color="success"
                                            label={dep}
                                            checked={ handleCheckedDep(dep) }
                                            onChange={() => handleCheckboxChange(dep)}                                
                                        />
                                ))}
                          
                            </FormGroup>
                        </Typography>

                        <Typography sx={{ display: findedUser.rol[0] === "admin" && 'none', paddingTop: "20px", paddingLeft: "10px"}}  variant="subtitle2">
                            <strong>Atención: Al guardar los cambios este usuario se convertirá en rol colaborador.</strong>
                        </Typography>

                        <Button sx={{ display: findedUser.rol[0] !== "colab" && 'none'}} variant="outlined" color="error" onClick={handleSetStudent}>Remover Permisos y Designar como Estudiante</Button>
                    </Stack>


                        {/* <Button sx={{ display: !displayUserInfo && 'none'}} variant="contained" color={assignBtnColor} onClick={handleSearchUser}>{assignBtnLabel}</Button> */}


                </DialogContentText>
                </DialogContent>
                <DialogActions>

                <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleSubmit} color="success">Guardar cambios</Button>
                </DialogActions>
            </Dialog>
        </>
        )}
