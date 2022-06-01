import { Button, ListItemSecondaryAction, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { dataQueryArray } from "../../../firebase/dataQuery";
import FirestoreManager from "../../../firebase/FirestoreManager";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AddDependencies from './AddDependencies';
import EditDependencies from "./EditDependencies";

const areasFull = [
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

const areas = ["Cargando...", ""];

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

  const [dependenciesData, setDependenciesData] = useState(areas);
  const [loaded, setLoaded] = useState(false);
  const [rerender, setRerender] = useState(0);

  /***
   * Function that fetches the data from the firestore database
   */
  useEffect(() => {
    dataQueryArray(FirestoreManager.getDependenciesList()).then((data) => {
      const dataArray = data.map((item) => item.name);
      setDependenciesData(dataArray);
      setLoaded(true);
      console.log(loaded)
    });
  }, [loaded]);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
        zIndex: "100",
        height: "100vh",
      }}
      variant="persistent"
      anchor="left"
      open={open}
      PaperProps={{
        style: {
          height: "100vh",
        }
      }}
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
          {dependenciesData.map((text, index) => (
            <Link href={`/${text}`} key={index}>
              <ListItem
                button
                key={text}
                sx={{
                  backgroundColor:
                    text === dependency ? "rgba(0, 0, 0, 0.1);" : "transparent",
                }}
              >
                <ListItemIcon>{/*añadir despues*/}</ListItemIcon>
                <ListItemText primary={text} />
                <ListItemSecondaryAction>
                  <EditDependencies dependencyName={text} setLoaded={setLoaded}/>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          ))}
          <AddDependencies setLoaded={setLoaded}/>
        </List>
        <Divider />
    </Drawer>
  );
}
