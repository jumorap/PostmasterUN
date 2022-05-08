import React from 'react'
import { Box, Chip, Container, Paper, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import PublicationTyper from './PublicationTyper'
import { publication_t } from '../../types'
//This component display the information card of navegacion principal
function InformationCard(props) {
  return (
    <Paper elevation={3} sx={{p: "1em", position: "relative", maxWidth :"700px"}}>
      <Stack spacing={1}>
        {/*Type of the publication*/}
        <PublicationTyper type={props.type}/>
      {/*Title of the publication*/}
      <Typography variant='h4'>
        {props.title}
      </Typography>

      {/*Description of the publication*/}
      <Typography variant='body1' sx = {{textAlign: "justify"}}>
        {props.description}
      </Typography>
      
      {/*Aditional links*/}
      <Stack direction="row" spacing={2} justifyContent = "center">
          {props.links.map(link => (
            <Chip
              key={link.name}
              label={link.name}
              component="a"
              href={link.url}
              target="_blank"
              clickable
              sx={{
                borderRadius: "5px",
                backgroundColor: "primary.lightRed",
                color: "white",
              }}
            />
          ))}
        </Stack>

        {/*Image of the publication*/}
        <Box justifyContent="center" alignItems = "center">
        {
            props.images.map(image => (
              <Image
                key={image}
                src={image}
                alt={props.title}
                width={300}
                height={200}
                layout="responsive"
                maxHeight={200}
              />
            ))
          }
        </Box>

        
        {/*Tags of the publication*/}
        <Stack direction="row" spacing={1} alignItems = "center" justifyContent={"flex-end"}>
          <Box>
            <Typography variant='body1' sx = {{color: "primary.gray"}}>
              Etiquetas:
            </Typography>
          </Box>
        {props.tags.map((tag, index) => (
          <Chip
          key={index}
          label={tag.name}
          sx = {{
            borderRadius: "5px",
          }}
          clickable
          />
        ))
        }
      </Stack>

        </Stack>
    </Paper>
  )
}

InformationCard.propTypes = publication_t

export default InformationCard
