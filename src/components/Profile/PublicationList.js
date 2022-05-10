import { Modal, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { InformationCard } from "../InformationCard";
import Publication from "./Publication";
import Proptypes from "prop-types";
import { publication_t } from "../../types";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function PublicationList({ list }) {
  /*State to control the modal*/
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);

  /*current publication to display when the user clicks over a saved publication*/
  const [currPubication, setCurrPubication] = useState({
    type: "tipo",
    title: "",
    description: "descripcion",
    tags: [],
    links: [],
    images: [],
    date: "",
    id: "",
  });

  const handleOpenPublication = (index) => {
    setCurrPubication(list[index]);
    setOpenModal(true);
  };

  return (
    <>
      {/*List of publications*/}
      <Box>
        <Typography variant="h2">Publicaciones Guardadas</Typography>
        <Stack direction={"column"} spacing={2}>
          {list.map((item, index) => {
            return (
              <Publication
                onClick={()=>handleOpenPublication(index)}
                key={index}
                title={item.title}
                description={item.description}
                date={item.date}
              />
            );
          })}
        </Stack>
      </Box>

      {/*Modal para mostrar la publicacion*/}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <InformationCard {...currPubication} />
        </Box>
      </Modal>
    </>
  );
}


PublicationList.prototype = {
  list: Proptypes.arrayOf(Proptypes.shape(publication_t)),
}