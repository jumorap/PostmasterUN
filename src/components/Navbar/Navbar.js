import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import Link from "next/link";
import { Stack } from "@mui/material";
import Router from "next/router";

import postmasterSvg from "../../../public/assets/postmaster_svg.svg";
import UserIcon from "./UserIcon";
import { firebaseAppAuth } from "../../../firebase/firebase.config";
import { LogBtn } from "../Login";


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
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    firebaseAppAuth.onAuthStateChanged((user) => {
      setIsUserAuthenticated(!!user?.email.toString().split('@')[1].includes('unal.edu.co'));
    });
  }, []);

  /* Get the image of the current user with firebase */
  const [user, setUser] = useState({
    src: "",
    name: "",
  });

  useEffect(() => {
    if (isUserAuthenticated) {
      firebaseAppAuth.onAuthStateChanged((user) => {
        if (user) {
          setUser({
            src: user.photoURL,
            name: user.displayName,
          });
        } else {
          setUser({
            src: "",
            name: "",
          });
        }
      });
    }
  }, [isUserAuthenticated]);
  console.log(isUserAuthenticated);

  return (
    <AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
      {/* to verify if the user is logged in  */}
      <div style={{display: "none"}}>
        <LogBtn/>
      </div>
      {/* end */}

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
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Link href={"/"}>
            <a>
              <Image
                src={postmasterSvg}
                alt="logo"
                height={"43,25px"}
                width={"252px"}
              />
            </a>
          </Link>
          <Stack direction={"row"} spacing = {6}>
            <UserIcon isUserAuthentified={isUserAuthenticated} user={user} />
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveAppBar;
