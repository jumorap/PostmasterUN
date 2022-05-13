import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { tags_t } from "../../types";
import Proptypes from "prop-types";

export default function SavedTags({ tags, handleTagDelete }) {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };


  return (
    <Box elevation={2} paddingLeft={4}>
      <Typography sx={{fontSize: "2em"}} paddingBottom={1} >Etiquetas Guardadas</Typography>
      <Stack direction={"row"}>
        {tags.map((item, index) => (
          <Chip
            label={item.name}
            onClick={handleClick}
            onDelete={()=>handleTagDelete(item)}
            key={index}
          />
        ))}
      </Stack>
    </Box>
  );
}

SavedTags.propTypes = {
    tags: Proptypes.arrayOf(Proptypes.shape(tags_t)),
    handleTagDelete: Proptypes.func,
}
