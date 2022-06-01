import React, {useContext, useEffect, useState} from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { DependencyContext, Filters, InformationCardList } from "../components";
import FirestoreManager from "../../firebase/FirestoreManager";
import { dataQueryArray } from "../../firebase/dataQuery"


//fake values for testing the filters
const tagTest = [
  { name: "filtroA", selected: false },
  { name: "filtroB", selected: false },
  { name: "filtroC", selected: false },
];

const informationList = [
  {
    type: "Cargando...",
    title: "Cargando...",
    description:
      "Cargando...",
    tags: [
      "Cargando..."
    ],
    images: ["https://picsum.photos/500/550"],
    links: [
      { name: "Cargando...", url: "#" },
    ],
    favorite: false,
  },
];


/**
 * Component that renders the main content of the page including the filters and the information cards
 * @returns {JSX.Element}
 */
export default function MainContent({dependency}) {
  const [tagList, setTagList] = useState(tagTest)
  const [postsData, setPostsData] = useState(informationList)
  const [loaded, setLoaded] = useState(false)
  const [dependencys, setDependencys] = useContext(DependencyContext)


  /***
   * Function that fetches the data from the firestore database
   */
  useEffect(() => {
    if (!loaded) {
      dataQueryArray(FirestoreManager.getPostsList()).then(
          (data) => {
            setPostsData(data);
            setLoaded(true);
          }
      )
    }
  }, [loaded])

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

  return (
    <Grid container spacing={{xs : 6, md : 3}} direction = {{xs : "column-reverse", md : "row"}}  >
        <Grid item xs = {12} md={8}>
          <InformationCardList informationList={postsData} />
        </Grid>
        <Grid item xs = {12}  md={4} sx = {{position: "relative"}}>
          <Box sx = {{position:{md: "sticky"}}}>
            <Filters tags={tagList} onClick={selectFilteredTag} />
          </Box>
        </Grid>
    </Grid>
  );
}
