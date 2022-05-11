import { Paper, Typography } from "@mui/material";
import React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InfoIcon from "@mui/icons-material/Info";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Drawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/router";

const areas = [
  "Postmaster",
  "DRE",
  "Bienestar",
  "Decanatura y Vicedecanatura",
  "Dirección académica",
  "DNINFOA",
  "OTIC",
  "Facultades",
  "RevistaUN",
  "Unimedios",
  "Bibliotecas",
  "Grupos estudiantiles",
];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function SideNavBar({ open, handleDrawerClose, drawerWidth }) {
  const router = useRouter();
  const { dependency } = router.query;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Typography variant="h6" noWrap>
          Dependencias
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List dense>
        {areas.map((text, index) => (
          <Link href={`/${text}`} key={index}>
            <ListItem button key={text} sx = {{backgroundColor: text === dependency?  "rgba(0, 0, 0, 0.1);" : "transparent"}}>
              <ListItemIcon>{/*añadir despues*/}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      
    </Drawer>
  );
}
