import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import LogBtn from "../Login/LogBtn";
import Image from "next/image";
import Link from "next/link";

import postmasterWhite from "../../../public/assets/postmaster_white.png";


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, drawerWidth }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const ResponsiveAppBar = ({ open, handleDrawerOpen, drawerWidth }) => {
  return (
    <AppBar position="fixed" open={open} drawerWidth = {drawerWidth}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link href={"/"}>
            <a>
              <Image src={postmasterWhite} alt="logo" height={"43,25px"} width={"252px"}/>
            </a>
          </Link>
          <LogBtn/>
        </Box>
      </Toolbar>
    </AppBar>
  );
};


export default ResponsiveAppBar;
