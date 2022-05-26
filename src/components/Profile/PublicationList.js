import { Modal, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Publication from "./Publication";
import Proptypes from "prop-types";
import { publication_t } from "../../types";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  margin: "20px",
};

/**
 *
 * @param {list} list lista de publicaciones
 * @param children children de la publicacion (imagen, titulo, etc)
 * @param selectItem funcion para seleccionar una publicacion de la lista de publicaciones
 * @handleOpen funcion que se ejecuta cada vez que se oprime una publicacion
 * @returns
 */
export default function PublicationList({ list, children, selectItem }) {
  /*State to control the modal*/
  // const [openModal, setOpenModal] = useState(false);
  const openModal = false
  const setOpenModal = () => openModal = true;
  const handleClose = () => setOpenModal(false);
  const handleOpen = (index) => {
    setOpenModal(true);
    selectItem(index);
  }

  return (
    <>
      {/*List of publications*/}
      <Box>
        <Typography variant="h2" align="center">Publicaciones Guardadas</Typography>
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