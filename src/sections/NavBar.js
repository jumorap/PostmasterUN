import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { styled, useTheme } from "@mui/material/styles";
import { Footer, Navbar, SideNavBar } from "../components";

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
      [theme.breakpoints.up('sm')]: {
        marginLeft: 0,
      }
    }),
  })
);

export default function PersistentDrawerLeft({children}) {
    const [open, setOpen] = React.useState(true);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    //get the width of the window
    const theme = useTheme();
    const responsive = theme.breakpoints.up("sm");
    console.log(responsive);

  
    return (
      <Box sx={{ display: "flex" }}>
        <Navbar open = {open} handleDrawerOpen = {handleDrawerOpen} drawerWidth = {drawerWidth}/>
        <SideNavBar open = {open} handleDrawerClose = {handleDrawerClose} drawerWidth = {drawerWidth}/>
        <Main open={open} responsive = {responsive}>
          {children}
        <Footer />
        </Main>
      </Box>
    );
  }