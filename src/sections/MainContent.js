import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DependencyContext, Filters, InformationCardList } from "../components";
import usePosts from "../components/Posts/usePosts";
import PageNotFound from "../components/Posts/PageNotFound";
import useFilters from "../components/Filters/useFilters";
import FirestoreManager from "../../firebase/FirestoreManager";

/**
 * Component that renders the main content of the page including the filters and the information cards
 * @param {String} dependency - The dependency of the current page
 * @returns {JSX.Element}
 */
export default function MainContent({ dependency }) {
  const { postsData, dependencyExists, dependency_id, filterPosts} = usePosts(dependency);
  console.log(dependency_id);
  const [FiltersComponent, selectedTags, setTagList] = useFilters([]);

  //fethc the filters of the dependency
  useEffect(() => {
    if (dependencyExists) {
      FirestoreManager.getTags(dependency_id).then((tags) => {
        setTagList(tags);
      });
    }
  }, [dependency_id]);

  //useEffect to filter the posts by the selected tags
  useEffect(() => {
    if (dependencyExists) {
      console.log(selectedTags);
      filterPosts(selectedTags);
    }
  }
  , [selectedTags]);


  //if the dependency doesn't exist, render the page not found
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
        <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }}>
          <InformationCardList informationList={postsData} />
        </Grid>
        {/* filters  */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            position: { xs: "inherit", md: "sticky" },
            top: 64,
            height: "fit-content",
          }}
          order={{ xs: 1, md: 2 }}
        >
          {FiltersComponent}
        </Grid>
      </Grid>
    </>
  );
}
