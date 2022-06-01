import { Box, Stack, Typography, Fab, Paper, Avatar, Divider} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import NewspaperIcon from '@mui/icons-material/Newspaper';

import React, { useState, useEffect } from "react";
import  SavedTags  from "./SavedTags";
import { InformationCard } from "../InformationCard";
import PublicationList from "./PublicationList";
import CreatePublication from "./CreatePublication";

import { firebaseAppAuth } from "../../../firebase/firebase.config"
import {getUser} from "../../../firebase/userManager"





const informationList = [
  {
    type: "Postmaster",
    title: "Graduación se realizará en las canchas de fútbol",
    description:
      "Esta es una pieza perteneciente a la campaña Orgullo UNAL, es de fondo azul con textos en blanco, tiene una fotografía donde se puede apreciar un procedimiento quirúrgico de apendicitis llevado a cabo por un equipo de cirujanos.",
    tags: [
      { name: "UNAL", favorite: false },
      { name: "UNAL", favorite: false },
      { name: "UNAL", favorite: false },
    ],
    images: ["https://picsum.photos/500/550"],
    links: [
      { name: "Clickable Link", url: "#basic-chip" },
      { name: "Clickable Link", url: "#basic-chip" },
      { name: "Clickable Link", url: "#basic-chip" },
    ],
    favorite: false,
    date: "2020-01-01",
  },
  {
    type: "Postmaster",
    title: "Primer lugar a investigación con sello UNAL",
    description:
      "Esta es una pieza perteneciente a la campaña Orgullo UNAL, es de fondo azul con textos en blanco, tiene una fotografía donde se puede apreciar un procedimiento quirúrgico de apendicitis llevado a cabo por un equipo de cirujanos.",
    tags: [
      { name: "UNAL", favorite: false },
      { name: "UNAL", favorite: false },
      { name: "UNAL", favorite: false },
    ],
    images: ["https://picsum.photos/500/550"],
    links: [
      { name: "Clickable Link", url: "#basic-chip" },
      { name: "Clickable Link", url: "#basic-chip" },
      { name: "Clickable Link", url: "#basic-chip" },
    ],
    favorite: false,
    date: "2020-01-01",
  },
  {
    type: "Postmaster",
    title: "Primer lugar a investigación con sello UNAL",
    description:
      "Esta es una pieza perteneciente a la campaña Orgullo UNAL, es de fondo azul con textos en blanco, tiene una fotografía donde se puede apreciar un procedimiento quirúrgico de apendicitis llevado a cabo por un equipo de cirujanos.",
    tags: [
      { name: "UNAL", favorite: false },
      { name: "UNAL", favorite: false },
      { name: "UNAL", favorite: false },
    ],
    images: ["https://picsum.photos/500/550"],
    links: [
      { name: "Clickable Link", url: "#basic-chip" },
      { name: "Clickable Link", url: "#basic-chip" },
      { name: "Clickable Link", url: "#basic-chip" },
    ],
    favorite: false,
    date: "2020-01-01",
  },
  {
    type: "Postmaster",
    title: "Primer lugar a investigación con sello UNAL",
    description:
      "Esta es una pieza perteneciente a la campaña Orgullo UNAL, es de fondo azul con textos en blanco, tiene una fotografía donde se puede apreciar un procedimiento quirúrgico de apendicitis llevado a cabo por un equipo de cirujanos.",
    tags: [
      { name: "UNAL", favorite: false },
      { name: "UNAL", favorite: false },
      { name: "UNAL", favorite: false },
    ],
    images: ["https://picsum.photos/500/550"],
    links: [
      { name: "Clickable Link", url: "#basic-chip" },
      { name: "Clickable Link", url: "#basic-chip" },
      { name: "Clickable Link", url: "#basic-chip" },
    ],
    favorite: false,
    date: "2020-01-01",
  },
  {
    type: "Postmaster",
    title: "Primer lugar a investigación con sello UNAL",
    description:
      "Esta es una pieza perteneciente a la campaña Orgullo UNAL, es de fondo azul con textos en blanco, tiene una fotografía donde se puede apreciar un procedimiento quirúrgico de apendicitis llevado a cabo por un equipo de cirujanos.",
    tags: [
      { name: "UNAL", favorite: false },
      { name: "UNAL", favorite: false },
      { name: "UNAL", favorite: false },
    ],
    images: ["https://picsum.photos/500/550"],
    links: [
      { name: "Clickable Link", url: "#basic-chip" },
      { name: "Clickable Link", url: "#basic-chip" },
      { name: "Clickable Link", url: "#basic-chip" },
    ],
    favorite: false,
    date: "2020-01-01",
  },
];

export default function Profile() {
  

  const [tags, setTags] = useState([
    { name: "Alemania", dependency: "DRE", id: "1" },
    { name: "Argentina", dependency: "DRE", id: "2" },
    { name: "Brasil", dependency: "DRE", id: "3" },
    { name: "Chile", dependency: "DRE", id: "4" },
  ]);

  function handleTagDelete(tag) {
    const newTags = tags.filter((t) => t.id !== tag.id);
    setTags(newTags);
  }

  /*current publication to display when the user clicks over a saved publication*/
  const [currPubication, setCurrPubication] = useState({
    type: "tipo",
    title: "",
    description: "descripción",
    tags: [],
    links: [],
    images: [],
    date: "",
    id: "",
  });

  const selectItem = (index) => {
    setCurrPubication(informationList[index]);
  };

  /*Firebase methods */

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isAdmin,setIsAdmin] = useState(false)
  const [showCreatePublication,setShowCreatePublication] = useState(false)


 
//Verify if user is admin to show createNews component
  useEffect(() => {
    firebaseAppAuth.onAuthStateChanged((u) => {
      setIsUserAuthenticated(!!u?.email.toString().split('@')[1].includes('unal.edu.co'));
      const user = getUser(u.uid)

      user.then(res => {
        //verify if user field rol is admin
        const rol = res.data().rol[0]
        if(rol == "admin"){
          setIsAdmin(true)
        }
      })
    })
}, [])

console.log('isAdmin=', isAdmin)

// Get User Information
const [user, setUser] = useState({
  src: "",
  name: "",
  email: "",
  favPost: 1
});

useEffect(() => {
  if (isUserAuthenticated) {
    firebaseAppAuth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          src: user.photoURL,
          name: user.displayName,
          email: user.email,
          favPost: 5
        });
      } else {
        setUser({
          src: "",
          name: "",
          email: "",
          favPost: 0
        });
      }
    });
  }
}, [isUserAuthenticated]);

console.log(isUserAuthenticated);



// const display flex y none
// if is admin entonces display flex, else none

  return (
    <Box sx={{paddingLeft: 10, paddingRight: 10}}>

      <Typography style={{fontWeight: 500}} variant="h4" gutterBottom >
        Información del Usuario
      </Typography>

      <Divider />

      <Stack marginBottom={5} marginTop={2}>
        <Paper elevation={4} sx = {{px:2, py: 2}}>
          <Stack direction={'row'} alignItems={'center'} spacing={5} >
            {/*Foto de perfil*/}
            <Avatar sx={{ width: 150, height: 150 }} src={user.src} />

            <Stack direction={'column'}>
              <Typography style={{fontWeight: 600}} variant="h6">{user.name}</Typography>
              <Typography variant="body2" color='#E51F1F' gutterBottom>{user.email}</Typography>
              <Typography variant="body2">Estudiante</Typography>
              <Typography variant="body2">Se unió el 23 de abril del 2022</Typography>
              <Typography variant="body2">Publicaciones guardadas: {user.favPost}</Typography>
            </Stack>

          </Stack>
        </Paper>
      </Stack>

      <Typography variant="h4" gutterBottom color='#FF2525'>
        Mis publicaciones
      </Typography>

      <Divider  color='#FFC8C8'/>

      <Stack spacing={4} direction = {"column"} sx = {{py: 2}}>

        <SavedTags tags={tags} handleTagDelete={handleTagDelete} />

        <PublicationList list={informationList} selectItem = {selectItem}>
          <InformationCard {...currPubication} />
        </PublicationList>
      </Stack>

      <Box sx={{
          display: !isAdmin && 'none',
          position: "fixed",
          justifyContent: "flex-end",
          bottom: 40,
          right: 40
        }}>
      
      <Fab variant="extended"
         onClick={() => {
          setShowCreatePublication(true)
        }}
      >
        <NewspaperIcon sx={{ mr: 1 }} />
        Publicar
      </Fab>
      </Box>
     
        <CreatePublication show={showCreatePublication}/>
    </Box>
  );
}




