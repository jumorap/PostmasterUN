import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Formular from '../components/Formular/Formular'

export default function Admin({section, close}) {
  return (
    <Box sx={{padding: "25px"}}>
        <Typography variant="h2">{section}</Typography>
        <Formular close={close} />
    </Box>
  )
}
