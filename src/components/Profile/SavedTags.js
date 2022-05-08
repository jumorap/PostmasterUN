import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { tags_t } from "../../types";
import Proptypes from "prop-types";

export default function SavedTags({ tags, handleTagDelete }) {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };


  return (
    <Paper sx={{ p: 2 }} elevation={2}>
      <Typography variant="h2">Tags Guardados</Typography>
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
    </Paper>
  );
}

SavedTags.propTypes = {
    tags: Proptypes.arrayOf(Proptypes.shape(tags_t)),
    handleTagDelete: Proptypes.func,
}
