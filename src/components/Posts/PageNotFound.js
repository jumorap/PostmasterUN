import { Box, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import postmasterRed from "../../../public/assets/postmaster_logo.png";

export default function PageNotFound() {
  return (
    <div>
        <Typography variant="h2" align='center' color={"secondary"}>
            La pagina que buscas no existe
        </Typography>

    </div>
  )
}
