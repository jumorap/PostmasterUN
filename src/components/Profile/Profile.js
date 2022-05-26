import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import  SavedTags  from "./SavedTags";
import { InformationCard } from "../InformationCard";
import PublicationList from "./PublicationList"

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
  const [list, setList] = useState([]);
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

  return (
    <Box>
      <Typography variant="h1" gutterBottom align="center">
        Mis publicaciones
      </Typography>
      <SavedTags tags={tags} handleTagDelete={handleTagDelete} />
      
      <PublicationList list={informationList} selectItem = {selectItem}>
        <InformationCard {...currPubication} />
      </PublicationList>
    </Box>
  );
}
