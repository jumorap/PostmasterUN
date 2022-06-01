import { Box, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import  SavedTags  from "./SavedTags";
import { InformationCard } from "../InformationCard";
import PublicationList from "./PublicationList"
import FirestoreManager from "../../../firebase/FirestoreManager";
import { AuthContext } from "../../../firebase/AuthProvider.config";

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
  const [savedPublications, setSavedPublications] = useState(informationList);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    FirestoreManager.getFavoritePosts(currentUser.uid).then(posts => {
      console.log(posts);
      setSavedPublications(posts);
    })
  }, [])
  

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

  return (
    <Box>
      <Typography variant="h1" gutterBottom align="center">
        Mis publicaciones
      </Typography>
      <Stack spacing={4} direction = {"column"}>
        <SavedTags tags={tags} handleTagDelete={handleTagDelete} />
        <PublicationList list={savedPublications} selectItem = {selectItem}>
          <InformationCard {...currPubication} />
        </PublicationList>
      </Stack>
    </Box>
  );
}
