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

/**
 * 
 * @param {list} list lista de publicaciones 
 * @handleOpen funcion que se ejecuta cada vez que se oprime una publicacion
 * @returns 
 */
export default function PublicationList({ list, children, handleOpen }) {
  /*State to control the modal*/
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);

  return (
    <>
      {/*List of publications*/}
      <Box>
        <Typography variant="h2">Publicaciones Guardadas</Typography>
        <Stack direction={"column"} spacing={2}>
          {list.map((item, index) => {
            return (
              <Publication
                onClick={()=>handleOpen(index)}
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
          {children}
        </Box>
      </Modal>
    </>
  );
}


PublicationList.prototype = {
  list: Proptypes.arrayOf(Proptypes.shape(publication_t)),
}