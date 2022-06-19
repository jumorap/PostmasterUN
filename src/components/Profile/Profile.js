import { Box, Stack, Typography, Paper, Avatar, Divider } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import SavedTags from "./SavedTags";
import { InformationCard } from "../InformationCard";
import PublicationList from "./PublicationList";
import FirestoreManager from "../../../firebase/FirestoreManager";
import { firebaseAppAuth } from "../../../firebase/firebase.config";
import { AuthContext } from "../../../firebase/AuthProvider.config";



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
      console.log(posts);
      setSavedPublications(posts);
    });
  }, []);

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

  // Check if user is admin to show createNews component
  useEffect(() => {
    firebaseAppAuth.onAuthStateChanged((u) => {
      setIsUserAuthenticated(
        !!u?.email.toString().split("@")[1].includes("unal.edu.co")
      );
    });
  }, []);

  // Get User Information
  const [user, setUser] = useState({
    src: "",
    name: "",
    email: "",
    favPost: 1,
  });

  useEffect(() => {
    if (isUserAuthenticated) {
      firebaseAppAuth.onAuthStateChanged((user) => {
        if (user) {
          setUser({
            src: user.photoURL,
            name: user.displayName,
            email: user.email,
            favPost: 5,
          });
        } else {
          setUser({
            src: "",
            name: "",
            email: "",
            favPost: 0,
          });
        }
      });
    }
  }, [isUserAuthenticated]);

  console.log(isUserAuthenticated);

  // const display flex y none
  // if is admin -> display flex, else none

  return (
    <Box sx={{ paddingLeft: 10, paddingRight: 10 }}>
      <Typography style={{ fontWeight: 500 }} variant="h4" gutterBottom>
        Información del Usuario
      </Typography>

      <Divider />

      <Stack marginBottom={5} marginTop={2}>
        <Paper elevation={4} sx={{ px: 2, py: 2 }}>
          <Stack direction={"row"} alignItems={"center"} spacing={5}>
            {/*Foto de perfil*/}
            <Avatar sx={{ width: 150, height: 150 }} src={user.src} />

            <Stack direction={"column"}>
              <Typography style={{ fontWeight: 600 }} variant="h6">
                {user.name}
              </Typography>
              <Typography variant="body2" color="#E51F1F" gutterBottom>
                {user.email}
              </Typography>
              <Typography variant="body2">Estudiante</Typography>
              <Typography variant="body2">
                Se unió el 23 de abril del 2022
              </Typography>
              <Typography variant="body2">
                Publicaciones guardadas: {user.favPost}
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Stack>

      <Typography variant="h4" gutterBottom color="#FF2525">
        Mis favoritos
      </Typography>

      <Divider color="#FFC8C8" />

      <Stack spacing={4} direction={"column"} sx={{ py: 2 }}>
        <PublicationList list={savedPublications} selectItem={selectItem}>
          <InformationCard {...currPubication} />
        </PublicationList>
      </Stack>
    </Box>
  );
}
