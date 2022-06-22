import {Typography} from "@mui/material";
import React, {useState} from "react";

const textStyle = {
  cursor: "pointer",
  color: "#8f8f8f",
  textDecoration: "underline",
  width: "fit-content",
  display: "inline-block",
  fontStyle: "italic",
  fontWeight: "bold",
};

/**
 * Compress a string to a certain length and return a body paragraph with the option to expand the text
 * @param {String} description the text to compress
 * @param {Number} limit the maximum length of the text
 * @param {Boolean} expandable
 * @returns
 */
export default function CollapsableText({
  description = "",
  limit = 200,
  expandable = true,
}) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const cuttedText = (
    <>
      {showFullDescription
        ? description
        : description.substring(0, limit) + "... "}
      {expandable && (
        <Typography
          variant={"subtitle1"}
          onClick={() => setShowFullDescription(!showFullDescription)}
          sx={textStyle}
        >
          {showFullDescription ? "Ocultar" : "Ver más"}
        </Typography>
      )}
    </>
  );

  return description.length > limit ? cuttedText : description;
}
