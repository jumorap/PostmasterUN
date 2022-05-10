import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Checkbox, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Proptypes from "prop-types";

export default function Publication({ title, description, date, onClick }) {
  const [elevation, setElevation] = useState(1);

  return (
    <Paper
      elevation={elevation}
      sx={{ p: 2, position: "relative" }}
      onMouseOver={() => setElevation(4)}
      onMouseOut={() => setElevation(1)}
    >
      <Stack direction={"row"} spacing={2} justifyContent="space-between">
        <Box sx={{ cursor: "pointer" }} onClick={onClick}>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="body2">{date}</Typography>
          <Typography variant="body1">{description}</Typography>
        </Box>
        <Box display={"flex"} alignItems="center">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite color="primary.strongRed" />}
          />
        </Box>
      </Stack>
    </Paper>
  );
}


Publication.propTypes = {
  title: Proptypes.string,
  description: Proptypes.string,
  date: Proptypes.string,
  onClick: Proptypes.func,
}