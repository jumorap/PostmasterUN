import { Box } from '@mui/material'
import React, { useState } from 'react'
import {  PublicationList } from '../components'

export default function Profile() {

    const [list, setList] = useState([]);


  return (
    <Box>
        <PublicationList list={["1", "2", "3"]}/>
    </Box>
  )
}


