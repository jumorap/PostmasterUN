import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FilterButton from "./FilterButton";
import SearchBar from "../SearchBar/SearchBar";

import styles from "./Filters.module.css";


/**
 * Section that shows the filters of the current page and allows the user to select them
 * @param {array} tags - The list of filters
 * @param {function} onClick - The function to call when the user clicks on a filter button
 * @return {React.Component}
 */
function Filters(props) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 1,
        position: "sticky",
      }}
    >
        <div className={styles.searchContainer}>
            <SearchBar/>
        </div>
      <Typography variant="h6">Filters</Typography>
      <Typography variant="subtitle1">
        Elija las categorias que desea ver
      </Typography>
      <Box
        spacing={2}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {props.tags.map((tag, index) => (
          <FilterButton
            key={index}
            label={tag.name}
            selected={tag.selected}
            onClick={() => props.onClick(index)}
          />
        ))}
      </Box>
    </Paper>
  );
}

Filters.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      favorite: PropTypes.bool,
      selected: PropTypes.bool,
    })
  ),
  onClick: PropTypes.func,
};

export default Filters;
