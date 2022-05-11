import React from "react";
import IconButton from "@mui/material/IconButton";
import { MdOutlineAccountCircle } from "react-icons/md";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import PropTypes from "prop-types";
import Link from "next/link";
import { Avatar, Box } from "@mui/material";

function UserIcon({ isUserAuthentified, user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <>
      {isUserAuthentified && (
        <Box>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar src = {user.src} alt = {user.name}/> 
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Link href="/perfil">
              <MenuItem onClick={handleClose}>{user.name.split(" ")[0]}</MenuItem>
            </Link>
            <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
          </Menu>
        </Box>
      )}
    </>
  );
}

UserIcon.propTypes = {
  auth: PropTypes.bool.isRequired,
};

export default UserIcon;
