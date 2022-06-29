import { Box, Stack, Typography, Paper, Avatar, Divider } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { InformationCard } from "../InformationCard";
import PublicationList from "./PublicationList";
import {getUser} from "../../../firebase/userManager"
import SetAdminPermission from "./setAdminPermission";
import CreatePublication from "./CreatePublication";
import FirestoreManager from "../../../firebase/FirestoreManager";
import { firebaseAppAuth } from "../../../firebase/firebase.config";
import { AuthContext } from "../../../firebase/AuthProvider.config";
import SetColabPermission from "./setColabPermission";


export default function Profile() {
  const [tags, setTags] = useState([
    { name: "Alemania", dependency: "DRE", id: "1" },
    { name: "Argentina", dependency: "DRE", id: "2" },
    { name: "Brasil", dependency: "DRE", id: "3" },
    { name: "Chile", dependency: "DRE", id: "4" },
  ]);

  const [savedPublications, setSavedPublications] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    FirestoreManager.getFavoritePosts(currentUser.uid).then((posts) => {
      setSavedPublications(posts);
    });
  }, [currentUser.uid]);

  function handleDeleteFavorite(postId) {
    const newSavedPublications = savedPublications.filter((post) => {
      return post.id !== postId;
    });
    setSavedPublications(newSavedPublications);
  }

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
    setCurrPubication(savedPublications[index]);
  };

  /*Firebase methods */
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("Estudiante");

  // Check if user is admin to show createNews component
  useEffect(() => {
    //check auth
    firebaseAppAuth.onAuthStateChanged((u) => {
      setIsUserAuthenticated(!!u?.email.toString().split("@")[1].includes("unal.edu.co")
      );
    });
  }, []);

  // Get User Information
  const [user, setUser] = useState({
    uid: "",
    src: "",
    name: "",
    email: "",
    favPost: 1,
    role: "",
  });

  useEffect(() => {
    if (isUserAuthenticated) {
      firebaseAppAuth.onAuthStateChanged((user) => {
        if (user) {
          //if user is auth, then find role
          const dbUser = getUser(user.uid)
          dbUser.then(res => {
            //verify if user field rol is admin or root
            //TODO: create feature for colab
            const rol = res.data().rol[0]
            console.log("rol:", rol)
            switch (rol) {
              case "user":
                setUserRole("user")
                break;
              case "root":
                setUserRole("root")
                break;
              case "admin":
                setUserRole("admin")
                break;
              case "colab":
                setUserRole("colab")
                break;
              case "estudiante":
                setUserRole("Estudiante")
              default:
                console.log("user doesn't have an specific role")
            }
          })
          setUser({
            uid: user.uid,
            src: user.photoURL,
            name: user.displayName,
            email: user.email,
            role: userRole,
            favPost: 5 //read by database
          });
        } else {
          setUser({
            uid: "",
            src: "",
            name: "",
            email: "",
            role: "",
            favPost: 0
          });
        }
      });
    }
  }, [isUserAuthenticated, userRole]);

  // const display flex y none
  // if is admin -> display flex, else none

  return (
    <Box sx={{ paddingLeft: 2, paddingRight: 2 }}>



      {/* Show create publication component if user is root or admin */}
      <CreatePublication disp={userRole === "root" || userRole === "admin" || userRole === "colab"}/>

      <Stack direction={'row'}>
        <Stack marginRight={2}>

          {/*First column */}
          <Stack marginBottom={5} marginTop={1}>
            <Paper elevation={4} sx={{ px: 2, py: 2 }}>
              <Stack direction={"column"} alignItems={"center"} spacing={2}>
                {/*Foto de perfil*/}
                <Avatar sx={{ width: 200, height: 200 }} src={user.src} />

                <Stack direction={'column'}>
                  <Typography style={{fontWeight: 600}} variant="h6" align="center">{user.name}</Typography>
                  <Typography variant="body2" color='#E51F1F' gutterBottom>{user.email}</Typography>
                  <Typography variant="body2">{user.role}</Typography>
                  <Typography variant="body2">Se unió el 23 de abril del 2022</Typography>



                  <Stack marginBottom={5} marginTop={2} sx={{
                    display: !(userRole === "root" || userRole === "admin") && "none"
                  }} >

                    <Typography style={{fontWeight: 500}} variant="h6" gutterBottom >
                      Configuración de permisos de usuario
                    </Typography>

                    <SetAdminPermission disp={userRole === "root" && "root" || userRole === "admin" && "admin"}/>
                    <SetColabPermission disp={userRole === "admin" && "admin"} id={"eEzMWTCdegPNCcAnMhsLjP0PSNZ2"}/>

                  </Stack>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Stack>

        <Divider orientation={"vertical"} flexItem />

        <Stack marginLeft={2}>
          {/*Second column */}

          {/* <Divider  color='#FFC8C8'/> */}
          <Paper elevation={4} sx = {{backgroundColor: '#e00000'}}>
            <Typography style={{color: 'white'}} variant="h4" gutterBottom align="center" sx={{paddingTop: 1}}>Publicaciones Guardadas</Typography>
          </Paper>


          <Divider color="#FFC8C8" />

          <Stack spacing={4} direction = {"column"} sx = {{py: 1}}>
            <PublicationList list={savedPublications} selectItem = {selectItem}>
              <InformationCard {...currPubication} />
            </PublicationList>
          </Stack>

        </Stack>

      </Stack>

    </Box>
  )
}
