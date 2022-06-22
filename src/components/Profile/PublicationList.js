import { Modal, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Publication from "./Publication";
import Proptypes from "prop-types";
import { publication_t } from "../../types";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -52.5%)",
  margin: "20px",
  overflow: "auto",
  maxHeight: "95%"
};

/**
 *
 * @param {list} list lista de publicaciones
 * @param children children de la publicacion (imagen, titulo, etc)
 * @param selectItem funcion para seleccionar una publicacion de la lista de publicaciones
 * @handleOpen funcion que se ejecuta cada vez que se oprime una publicacion
 * @returns
 */
export default function PublicationList({ list, children, selectItem, handleUncheck = () => {} }) {
  /*State to control the modal*/
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => setOpenModal(false);
  const handleOpen = (index) => {
    setOpenModal(true);
    selectItem(index);
  }

  return (
    <Paper elevation={0} sx = {{px:2, py: 1}}>
      {/*List of publications*/}
      <Box>
      {list.length == 0 ? (
        <Typography variant="h6" gutterBottom color = "seconday">
          No tienes ninguna publicación guardada
        </Typography>
      ) : ""}
        
        <Stack direction={"column"} spacing={2}>
          {list.map((item, index) => {
            return (
              <Publication
                onClick={()=>handleOpen(index)}
                key={index}
                title={item.title}
                description={""} //item.description
                date={item.date}
                postId={item.id}
                handleUncheck={()=>handleUncheck(item.id)}
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
    </Paper>
  );
}


PublicationList.prototype = {
  list: Proptypes.arrayOf(Proptypes.shape(publication_t)),
}