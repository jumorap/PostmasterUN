import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Alert, IconButton, Snackbar } from "@mui/material";
import FirestoreManager from "../../../firebase/FirestoreManager";


export default function DeleteButton({ postId }) {
    console.log(postId)
  const [openSnak, setOpenMessage] = React.useState(false);

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  };

  function handleDelete() {
    FirestoreManager.deletePost(postId);
    setOpenMessage(true);
  }



  return (
    <>
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
      <Snackbar
        open={openSnak}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity={"success"}
          sx={{ width: "100%" }}
        >
          {"Post eliminado con éxito"}
        </Alert>
      </Snackbar>
    </>
  );
}
