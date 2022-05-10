import React, { useState } from "react";
import ListItemIcon from '@mui/material/ListItemIcon';
import LinkIcon from '@mui/icons-material/Link';
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Link from '@mui/material/Link';
import StarBorder from '@mui/icons-material/StarBorder';
import ListSubheader from "@mui/material/ListSubheader";
import {data} from './data';
import Typography from "@mui/material/Typography";



function FooterBody() {
  const [open, setOpen] = useState({});

  const handleClick = (id) => {
    setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  return (
    <div>
      
      <List sx={{paddingLeft: "20px"}}>
        <ListSubheader>
          <Typography variant="h5" noWrap textAlign="left" paddingTop="20px" paddingBottom="20px" color={"black"}>
            Enlaces de interés
          </Typography>
        </ListSubheader>
      {data.map((data) => {
        return (
          <>
            <ListItemButton onClick={() => handleClick(data.id)}>
            <Link href={data.url}>
              <ListItemIcon>
                <LinkIcon/>
              </ListItemIcon>
            </Link>
            <ListItemText primary={data.titulo} />
              {open[data.id] ? <ExpandLess /> : <ExpandMore />}
              
            </ListItemButton>
            <Collapse in={open[data.id]} timeout="auto" unmountOnExit>
                {data.items.map((item) => {
                  return (
                    <List key={""} component="div" disablePadding>
                      <ListItem sx={{ pl: 8 }}>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    </List>
                  )
                })}
            </Collapse>
          </>
        );
      })}
      </List>
    </div>
    
  );
}

export default FooterBody;