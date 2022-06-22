import React, { useState } from "react";
import Filters from "./FIlters";

function preProcessTags(tags) {
  return tags.map((tagName) => {
    return {
      name: tagName,
      selected: false,
    };
  });
}



/**
 * Given a list of tags, returns a list of buttons that can be used to filter the posts
 * @param {List[String]} filterList list of tags to be used as filters
 * @returns
 */
export default function useFilters(filterList) {
  const [tagList, setTagList] = useState(preProcessTags(filterList));
  const [selectedTags, setSelectedTags] = useState([]);

  /**
   * Function to handle the click event of the filter button, when the user clicks on a filter button
   * @param {number} index - The index of the filter button that was clicked on the list tagList
   */
  function toggleFilterTag(index) {
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

  /**
   * Function to handle the click event of the filter button, when the user clicks on a filter button.
   * it add the selected tag to the list of selected tags and if it is already in the list, it removes it
   * @param {number} index - The index of the filter button that was clicked on the list tagList
   * @param {boolean} selected - The new state of the filter button
   * @returns {void}
   */
  function selectFilteredTag(index) {
    if(!tagList[index].selected) {
      setSelectedTags([...selectedTags, tagList[index].name]);
    }
    else {
      setSelectedTags(selectedTags.filter(tag => tag !== tagList[index].name));
    }
  }


  function handleClick(index) {
    selectFilteredTag(index);
    toggleFilterTag(index);
  }

  const body = <Filters tags={tagList} onClick={handleClick} />;

  return [body, selectedTags, setTagList];
}
