import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { styled, useTheme } from "@mui/material/styles";
import MainContent from "../src/sections/MainContent";
import { Navbar, SideNavBar } from "../src/components";

const drawerWidth = 240;
const navBarheight = 100;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flex: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    paddingTop: navBarheight,
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);



export default function PersistentDrawerLeft() {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar open = {open} handleDrawerOpen = {handleDrawerOpen} drawerWidth = {drawerWidth}/>
      <SideNavBar open = {open} handleDrawerClose = {handleDrawerClose} drawerWidth = {drawerWidth}/>
      <Main open={open}>
        <MainContent />
      </Main>
    </Box>
  );
}
