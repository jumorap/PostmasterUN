import React, {useEffect, useState} from 'react'
import { Box, Chip, Container, Paper, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import PublicationTyper from './PublicationTyper'
import { publication_t } from '../../types'
import PropTypes from 'prop-types'
import { dataQueryById } from "../../../firebase/dataQuery";
import FirestoreManager from "../../../firebase/FirestoreManager";



//This component display the information card of navegacion principal
function InformationCard({type, title, description, links, images, tags}) {

    const [dependenciesDataById, setDependenciesDataById] = useState([])
    const [loaded, setLoaded] = useState(false)

    /***
     * Function that fetches the data from the firestore database
     */
    useEffect(() => {
        if (!loaded) {
            dataQueryById(FirestoreManager.getDependenciesList()).then(
                (data) => {
                    setDependenciesDataById(data);
                    setLoaded(true);
                })
        }
    }, [loaded])

  return (
    <Paper elevation={3} sx={{p: "1em", position: "relative", maxWidth :"700px"}}>
      <Stack spacing={1}>
          {/*Type of the publication*/}
          {/* From dependenciesDataById we get the name of the publication based in the id */}
          <PublicationTyper type={
            dependenciesDataById.map((dependency) => {
                if (dependency.id === type) return dependency.name
            })
          }/>
      {/*Title of the publication*/}
      <Typography variant='h4'>
        {title}
      </Typography>

      {/*Description of the publication*/}
      <Typography variant='body1' sx = {{textAlign: "justify"}}>
        {description}
      </Typography>
      
      {/*Aditional links*/}
      <Stack direction="row" spacing={2} justifyContent = "center">
          {links.map(link => (
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
            images.map(image => (
              <Image
                key={image}
                src={image}
                alt={title}
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
            {/* tags is an array of strings that will be displayed as chips */}
            {
                tags.map((tag, index) => (
                    <Chip
                        key={index}
                        label={typeof tag === "string"? tag : tag.name}
                        sx={{
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
