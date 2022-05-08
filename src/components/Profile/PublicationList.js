import { Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Publication from './Publication'


export default function PublicationList({list}) {
  return (
     <Box>
         <Typography variant='h2'>
                Publicaciones Guardadas
         </Typography>
        <Stack direction={"column"} spacing = {2}>
            {list.map((item, index) => {
                return (
                    <Publication/>
                )
                }
            )}
        </Stack>
     </Box> 
  )
}


