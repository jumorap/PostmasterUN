import React from "react"
import { InputBase } from "@mui/material"
import { FaSearch } from "react-icons/fa"

import styles from "./SearchBar.module.css"


const SearchBar = () => {
    return (
        <InputBase
            placeholder="Busca noticias, eventos, entre otros."
            inputProps={{ 'aria-label': 'search'}}
            className={styles.searchBar}
            endAdornment={<FaSearch />}
            sx={{with: "100%"}}
            fullWidth = {true}
        />
    )
}

export default SearchBar
