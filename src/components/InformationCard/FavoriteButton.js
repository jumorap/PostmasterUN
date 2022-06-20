import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Alert, Checkbox, Snackbar } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../../../firebase/AuthProvider.config";
import FirestoreManager from "../../../firebase/FirestoreManager";

export default function FavoriteButton({ postId, defaultChecked = false, handleUncheck = () => { } }) {
  const [checked, setChecked] = React.useState(defaultChecked);
  const [openSnak, setOpenMessage] = React.useState(false);
  const [isAdded, setIsAdded] = React.useState(true);

  const { currentUser } = useContext(AuthContext);

  function handleChange(event) {
    setChecked(event.target.checked);
    handleSnackBarOpen();
  }

  const handleSnackBarOpen = () => {
    if (checked) {
      //the heart is already checked
      setOpenMessage(true);
      setIsAdded(false);
      //remove the post from the favorites of the user and update the firestore database
      FirestoreManager.removeFavorite(postId, currentUser.uid);
      handleUncheck();
    } else {
      //the heart is not checked
      setOpenMessage(true);
      setIsAdded(true);
      //add the post to the favorites of the user and update the firestore database
      FirestoreManager.addFavorite(postId, currentUser.uid);
    }
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  };

  return (
    <>
      <Checkbox
        inputProps={{ "aria-label": "Checkbox demo" }}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        checked={checked}
        onChange={handleChange}
      />
      <Snackbar
        open={openSnak}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity={isAdded ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {isAdded
            ? "Publicacion añadida a a favoritos correctamente"
            : "Publicacion eliminada de favoritos correctamente"}
        </Alert>
      </Snackbar>
    </>
  );
}
