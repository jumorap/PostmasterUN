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
import { dataQueryArray, mapDependencies } from "../../../firebase/dataQuery";
import FirestoreManager from "../../../firebase/FirestoreManager";
import { firebaseAppAuth} from "../../../firebase/firebase.config"
import { getUser } from "../../../firebase/userManager";

import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import AddDependencies from './AddDependencies';
import EditDependencies from "./EditDependencies";
import CreatePublication from "../Profile/CreatePublication";

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

  const [isAdmin,setIsAdmin] = useState(false);

  /***
   * Function that fetches the data from the firestore database
   */
   useEffect(() => {
    if (!loaded) { //To re-render when created or edited, just take the code inside the if outside.
      dataQueryArray(FirestoreManager.getDependenciesList()).then((data) => {
        const dataArray = data.map((item) => item.name);
        setDependenciesData(dataArray);
        setLoaded(true);
      });
    }
    
  }, [loaded]);

  //Verify if user is admin to show edit and create component
  useEffect(() => {
    firebaseAppAuth.onAuthStateChanged((u) => {
      const user = getUser(u.uid)

      user.then(res => {
        //verify if user field rol is admin
        const rol = res.data().rol[0]
        if(rol == "admin"){
          setIsAdmin(true)
        }
      })
    })
  }, [])

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
                <ListItemSecondaryAction sx={{display: !isAdmin && "none"}}>
                  <EditDependencies dependencyName={text} setLoaded={setLoaded}/>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          ))}
          <AddDependencies setLoaded={setLoaded} disp={isAdmin}/>
        </List>
        <Divider />

        {/* Show create publication component if user is admin */}
        <CreatePublication disp={isAdmin}/>
    </Drawer>
  );
}
