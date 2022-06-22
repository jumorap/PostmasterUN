import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography } from "@mui/material";

function PublicationTyper(props) {
  return (
    <Paper
      sx={{
        width: "fit-content",
        height: "fit-content",
        backgroundColor: "primary.strongRed",
        p: "0.5em",
        position: "absolute",
        right: "25px",
        top: "5px",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: "1.5em",
          fontWeight: "bold",
          color: "white",
        }}
      >
        {props.type}
      </Typography>
    </Paper>
  );
}

PublicationTyper.propTypes = {
    type: PropTypes.string.isRequired,
};

export default PublicationTyper;
