import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/icons-material/AccountCircleOutlined';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import DropDown from '@mui/icons-material/ArrowDropDown';

import styles from "./NavBar.module.css"


const pages = ['Inicio', 'Áreas Curriculares'];
const settings = ['Mi perfil', 'Favoritos', 'Cerrar Sesión'];
const areas = ['Postmaster', 'DRE', 'Bienestar','Decanatura y Vicedecanatura', 'Dirección academica', 'DNINFOA', 'OTIC', 'Facultades', 'RevistaUN', 'Unimedios', 'Bibliotecas', 'Grupos estudiantiles']

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElArea, setAnchorElArea] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenAreaMenu = (event) => {
    setAnchorElArea(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseAreaMenu = () => {
    setAnchorElArea(null);
  };

  return (

        <Toolbar disableGutters>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
       
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} cl >
                  <div>{page}</div>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Box sx={{ ml: '350px', flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              
              <Button style={{textTransform: 'none', fontSize: '20px', fontWeight: '800', color:'white'}}>
                Inicio
              </Button>
              <Box color='white' fontSize='30px' fontWeight='5' m='1%'>
                |
              </Box>

              <Tooltip title="Ver áreas">
                <Button onClick={handleOpenAreaMenu} style={{textTransform: 'none', fontSize: '20px', fontWeight: '600', color:'white'}}>
                  Áreas Curriculares <DropDown  shape={'square'} shapeRendering='auto' style={{color: "white"}}/>
                </Button>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElArea}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElArea)}
                onClose={handleCloseAreaMenu}
              >
                {areas.map((areas) => (
                  <MenuItem key={areas} onClick={handleCloseAreaMenu}>
                    <Typography textAlign="center">{areas}</Typography>
                  </MenuItem>
                ))}
              </Menu>
          </Box>

          

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Opciones de perfil">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 2 }}>
                <Avatar style={{color: "gray", fontSize:'40px'}} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>

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
