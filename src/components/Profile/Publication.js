import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { Checkbox, Paper, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'


export default function Publication({id, titulo, descripcion, fecha}) {
    const [elevation, setElevation] = useState(1)

  return (
    <Paper elevation={elevation} sx = {{p:2, position: "relative"}} onMouseOver={()=>setElevation(4)} onMouseOut = {()=>setElevation(1)}>
        <Stack direction={"row"} spacing = {2} justifyContent = "space-between">
        <Box sx={{"cursor": "pointer"}}>
            <Typography variant='h4'>
                Nombre de la publicacion
            </Typography>
            <Typography variant='body1'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Mauris eget ipsum eget nunc varius aliquam.
                Nulla facilisi.
            </Typography>
        </Box>
        <Box display={"flex"} alignItems = "center">
            <Checkbox  icon={<FavoriteBorder />} checkedIcon={<Favorite color='primary.strongRed'/>} />
        </Box>
        </Stack>
    </Paper>
  )
}
