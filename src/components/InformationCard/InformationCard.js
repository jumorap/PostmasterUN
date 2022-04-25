import React from 'react'
import PropTypes from 'prop-types'
import { Box, Chip, Container, Paper, Stack, Typography } from '@mui/material'
import Image from 'next/image'
//This component display the information card of navegacion principal
function InformationCard(props) {
  return (
    <Paper elevation={3} sx={{p: "1em"}}>
      <Stack spacing={1}>
      <Typography variant='h2'>
        {props.type}
      </Typography>
      <Typography variant='h6'>
        {props.title}
      </Typography>
      <Typography variant='body1'>
        {props.description}
      </Typography>
      <Stack direction="row" spacing={1}>
        {props.tags.map((tag, index) => (
          <Chip
          key={index}
          label={tag.name}
          color="primary"
          clickable
          />
        ))
        }
      </Stack>
        <Box>
        {
            props.images.map(image => (
              <Image
                key={image}
                src={image}
                alt={props.title}
                width={200}
                height={200}
              />
            ))
          }
        </Box>

        <Stack direction="row" spacing={1}>
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
              }}
            />
          ))}
        </Stack>
        </Stack>
    </Paper>
  )
}

InformationCard.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        favorite: PropTypes.bool
        })),
    images: PropTypes.arrayOf(PropTypes.string),
    links: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string
        })),
    favorite: PropTypes.bool,
}

export default InformationCard
