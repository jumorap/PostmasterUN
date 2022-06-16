import React, { useContext, useState } from "react";
import {
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import PublicationTyper from "./PublicationTyper";
import { publication_t } from "../../types";
import { DependencyContext } from "../contextProviders";
import FavoriteButton from "./FavoriteButton";
import DeleteButton from "./DeleteButton";

//This component display the information card of navegacion principal
function InformationCard({ type, title, description, links, images, tags, postID }) {
  const [dependenciesDataById, setDependenciesDataById] = useContext(DependencyContext);
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <Paper
      elevation={3}
      sx={{ p: "1em", position: "relative", maxWidth: "700px"}}
    >
      {/* Delete button that must be showed to admin roles */}
      <DeleteButton postId={postID} />

      <Stack spacing={1}>
        {/*Type of the publication*/}
        {/* From dependenciesDataById we get the name of the publication based in the id */}
        <PublicationTyper
          type={dependenciesDataById.map((dependency) => {
            if (dependency.id === type) return dependency.name;
          })}
        />

        {/*Title of the publication*/}
        <Typography variant="h4">{title}</Typography>

        {/*Description of the publication*/}
        <Typography variant="body1" sx={{ textAlign: "justify" }}>
            {/* Limit the description to 200 characters with a button to show less or more */}
            {description.length > 200
                ? (
                    <>
                        {showFullDescription
                            ? description
                            : description.substring(0, 200) + "... "
                        }
                        <Typography
                        variant={"subtitle1"}
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        sx={{
                            cursor: "pointer",
                            color: "#8f8f8f",
                            textDecoration: "underline",
                            width: "fit-content",
                            display: "inline-block",
                            fontStyle: "italic",
                            fontWeight: "bold",
                        }}
                        >
                            {showFullDescription ? "Ocultar" : "Ver más"}
                        </Typography>
                    </>
                )
                : description
            }

        </Typography>

        {/*Aditional links*/}
        <Stack direction="row" spacing={2} justifyContent="center">
          {links.map((link) => (
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
        <Box justifyContent="center" alignItems="center">
          {images.map((image) => (
            <Image
              key={image}
              src={image}
              alt={title}
              width={300}
              height={200}
              layout="responsive"
              maxHeight={200}
            />
          ))}
        </Box>

        {/*Tags of the publication*/}
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent={"space-between"}
        >
          {/* Heart Icon for addind favorite publications */}
          <FavoriteButton postId={postID}/>
          <Box>
            <Typography variant="body1" sx={{ color: "primary.gray" }}>
              Etiquetas:
            </Typography>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={typeof tag === "string" ? tag : tag.name}
                sx={{
                  borderRadius: "5px",
                }}
                clickable
              />
            ))}
          </Box>
          {/* tags is an array of strings that will be displayed as chips */}
        </Stack>
      </Stack>
    </Paper>
  );
}

InformationCard.propTypes = publication_t;

export default InformationCard;
