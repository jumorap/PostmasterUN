import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";

const pages = ["Inicio", "Áreas Curriculares"];
const settings = ["Mi perfil", "Favoritos", "Cerrar Sesión"];
const areas = [
  "Postmaster",
  "DRE",
  "Bienestar",
  "Decanatura y Vicedecanatura",
  "Dirección academica",
  "DNINFOA",
  "OTIC",
  "Facultades",
  "RevistaUN",
  "Unimedios",
  "Bibliotecas",
  "Grupos estudiantiles",
];

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
          <Typography variant="h4" noWrap>
            Postmaster
          </Typography>
          <Typography
            variant="h4"
            noWrap
            sx={{
              backgroundColor: "primary.strongRed",
              borderRadius: "0 1rem",
              padding: "0 0.5rem",
              m: "0 0.3em",
            }}
          >
            UN
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const NavBar = () => {
    return (
        <div className={styles.generalDiv}>
            <div className={styles.navbar} >
                <div className={styles.redlogo}>
                    <div className={styles.pun}>PUN</div>
                </div>
                <ResponsiveAppBar/>
            </div>
        </div>
    )
}

export default NavBar;
