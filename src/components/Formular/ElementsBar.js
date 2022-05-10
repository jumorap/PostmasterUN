import React from "react";
import PropTypes from "prop-types";
import { Chip, Paper, Stack } from "@mui/material";

function ElementsBar({list, handleTagDelete}) {
  return (
    <Paper elevation={2} sx={{ p: "10px" }}>
      <Stack direction={"row"} spacing={3}>
          {
              //get the lenght of the list
                list.length === 0 ? "Porfavor añada un tag": ""
          }
          {list.map((item, index) => (
             <Chip label={item.name} key={index} onDelete={() => handleTagDelete(item)}/> 
          ))}
      </Stack>
    </Paper>
  );
}

ElementsBar.propTypes = {};

export default ElementsBar;
