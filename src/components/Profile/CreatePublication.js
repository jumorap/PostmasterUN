import { Box, Stack, Typography, Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import NewspaperIcon from '@mui/icons-material/Newspaper';

import React, { useState, useEffect } from "react";
import { Paper} from '@mui/material'




// import {setPublication} from "../../../firebase/userManager"



function CreatePublication(showCreatePublication) {

//si showCreatePublication == false, no mostrar este componente modal, display: none



    return(
        <Paper elevation={3}
         zIndex="modal"
         sx={{p: "1em", position: "relative", maxWidth :"700px"}}>



        </Paper>

        )}


export default CreatePublication