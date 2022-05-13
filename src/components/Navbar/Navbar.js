import { useEffect, useState } from "react";
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
import postmasterSvg from "../../../public/assets/postmaster_svg.svg";
import UserIcon from "./UserIcon";
import { firebaseAppAuth } from "../../../firebase/firebase.config";
import { Stack } from "@mui/material";

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
  const [isUserAuthentified, setIsUserAuthentified] = useState(false);
  useEffect(() => {
    firebaseAppAuth.onAuthStateChanged((user) => {
      if (user) {
        setIsUserAuthentified(true);
      } else {
        setIsUserAuthentified(false);
      }
    });
  }, []);

  /* Get the image of the current user with firebase */
  const [user, setUser] = useState({
    src: "",
    name: "",
  });

  useEffect(() => {
    if (isUserAuthentified) {
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
  }, [isUserAuthentified]);

  return (
    <AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
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
            <UserIcon isUserAuthentified={isUserAuthentified} user={user} />
            <LogBtn />
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveAppBar;
