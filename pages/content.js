import React, { useState } from "react";
import PropTypes from "prop-types";
import { Filters, InformationCardList } from "../src/components";
import { Box, Grid } from "@mui/material";

//fake values for testing the filters
const tagTest = [
  { name: "filtroA", selected: false },
  { name: "filtroB", selected: false },
  { name: "filtroC", selected: false },
];

const informationList = [
	{type: "Postmaster", title : "Primer lugar a investigación con sello UNAL", description : "Esta es una pieza perteneciente a la campaña Orgullo UNAL, es de fondo azul con textos en blanco, tiene una fotografía donde se puede apreciar un procedimiento quirúrgico de apendicitis llevado a cabo por un equipo de cirujanos.", tags: [{name: "UNAL", favorite: false}, {name: "UNAL", favorite: false}, {name: "UNAL", favorite: false}], images: ["https://picsum.photos/500/550"], links: [{name: "Clickable Link", url: "#basic-chip"}, {name: "Clickable Link", url: "#basic-chip"}, {name: "Clickable Link", url: "#basic-chip"}], favorite: false},
	{type: "Postmaster", title : "Primer lugar a investigación con sello UNAL", description : "Esta es una pieza perteneciente a la campaña Orgullo UNAL, es de fondo azul con textos en blanco, tiene una fotografía donde se puede apreciar un procedimiento quirúrgico de apendicitis llevado a cabo por un equipo de cirujanos.", tags: [{name: "UNAL", favorite: false}, {name: "UNAL", favorite: false}, {name: "UNAL", favorite: false}], images: ["https://picsum.photos/500/550"], links: [{name: "Clickable Link", url: "#basic-chip"}, {name: "Clickable Link", url: "#basic-chip"}, {name: "Clickable Link", url: "#basic-chip"}], favorite: false},
	{type: "Postmaster", title : "Primer lugar a investigación con sello UNAL", description : "Esta es una pieza perteneciente a la campaña Orgullo UNAL, es de fondo azul con textos en blanco, tiene una fotografía donde se puede apreciar un procedimiento quirúrgico de apendicitis llevado a cabo por un equipo de cirujanos.", tags: [{name: "UNAL", favorite: false}, {name: "UNAL", favorite: false}, {name: "UNAL", favorite: false}], images: ["https://picsum.photos/500/550"], links: [{name: "Clickable Link", url: "#basic-chip"}, {name: "Clickable Link", url: "#basic-chip"}, {name: "Clickable Link", url: "#basic-chip"}], favorite: false},
	{type: "Postmaster", title : "Primer lugar a investigación con sello UNAL", description : "Esta es una pieza perteneciente a la campaña Orgullo UNAL, es de fondo azul con textos en blanco, tiene una fotografía donde se puede apreciar un procedimiento quirúrgico de apendicitis llevado a cabo por un equipo de cirujanos.", tags: [{name: "UNAL", favorite: false}, {name: "UNAL", favorite: false}, {name: "UNAL", favorite: false}], images: ["https://picsum.photos/500/550"], links: [{name: "Clickable Link", url: "#basic-chip"}, {name: "Clickable Link", url: "#basic-chip"}, {name: "Clickable Link", url: "#basic-chip"}], favorite: false},
	{type: "Postmaster", title : "Primer lugar a investigación con sello UNAL", description : "Esta es una pieza perteneciente a la campaña Orgullo UNAL, es de fondo azul con textos en blanco, tiene una fotografía donde se puede apreciar un procedimiento quirúrgico de apendicitis llevado a cabo por un equipo de cirujanos.", tags: [{name: "UNAL", favorite: false}, {name: "UNAL", favorite: false}, {name: "UNAL", favorite: false}], images: ["https://picsum.photos/500/550"], links: [{name: "Clickable Link", url: "#basic-chip"}, {name: "Clickable Link", url: "#basic-chip"}, {name: "Clickable Link", url: "#basic-chip"}], favorite: false},
]

/**
 * Section with the list of information cards and the filters
 * @param {array} informationCards - The list of information cards
 * @param {array} tags - The list of filters
 * @param {function} onClick - The function to call when the user clicks on a filter button
 * @return {React.Component}
 */
function content() {
	// list with the current filters
  const [tagList, setTagList] = useState(tagTest);

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
    <Grid
      container
      spacing={3}
      sx={{
        p: 3,
        width: "100%",
        height: "100%",
      }}
    >
      <Grid item xs={8}>
        <InformationCardList informationList={informationList} />
      </Grid>
      <Grid item xs={4}>
        <Filters tags={tagList} onClick={selectFilteredTag} />
      </Grid>
    </Grid>
  );
}

export default content;
