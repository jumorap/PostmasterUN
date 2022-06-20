import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DependencyContext, Filters, InformationCardList } from "../components";
import FirestoreManager from "../../firebase/FirestoreManager";
import { dataQueryArray } from "../../firebase/dataQuery";
import usePosts from "../components/Posts/usePosts";
import PageNotFound from "../components/Posts/PageNotFound";

//fake values for testing the filters
const tagTest = [
  { name: "filtroA", selected: false },
  { name: "filtroB", selected: false },
  { name: "filtroC", selected: false },
];

/**
 * Component that renders the main content of the page including the filters and the information cards
 * @returns {JSX.Element}
 */
export default function MainContent({ dependency }) {
  const [tagList, setTagList] = useState(tagTest);
  const [postsList, dependencyExists] = usePosts(dependency);

  /**
   * Function to handle the click event of the filter button, when the user clicks on a filter button
   * @param {number} index - The index of the filter button that was clicked on the list tagList
   */
  function selectFilteredTag(index) {
    const newTagList = tagList.map((tag, i) => {
      if (i === index) {
        return {
          ...tag,
          selected: !tag.selected,
        };
      }
      return tag;
    });
    setTagList(newTagList);
  }

  // the url doesn't exist in the database
  if (!dependencyExists) {
    return <PageNotFound />;
  }

  return (
    <>
      <Typography
        sx={{ fontSize: "3rem", fontWeight: 500, marginBottom: "3.5rem" }}
        variant="h2"
      >
        {dependency}
      </Typography>
      <Grid
        container
        spacing={{ xs: 6, md: 3 }}
        direction={{ xs: "column", md: "row" }}
      >
        {/* Publications */}
        <Grid item xs={12}  md={8} order = {{xs: 2, md: 1}}>
          <InformationCardList informationList={postsList} />
        </Grid>
        {/* filters  */}
        <Grid item xs={12} md={4} sx={{position: {xs: "inherit" ,md:"sticky"}, top : 64,  height: "fit-content"}} order = {{xs: 1, md: 2}}>
          <Box>
            <Filters tags={tagList} onClick={selectFilteredTag} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
