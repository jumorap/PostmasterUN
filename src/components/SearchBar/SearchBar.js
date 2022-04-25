import React from "react"
import { InputBase } from "@mui/material"
import { FaSearch } from "react-icons/fa"

import styles from "./SearchBar.module.css"


const SearchBar = () => {
    return (
        <InputBase
            placeholder="Busca Noticias, Eventos, etc..."
            inputProps={{ 'aria-label': 'search'}}
            className={styles.searchBar}
            endAdornment={<FaSearch />}
        />
    )
}

export default SearchBar
