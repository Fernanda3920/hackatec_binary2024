import React from "react";
import "./header.css"

import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";

import About from '../about/about.jsx';
import Home from '../home/home.jsx';

import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Home', 'About', 'Legal'];

export default function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const [value, setValue] = React.useState('');
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
    <BrowserRouter>
      <AppBar position="static" class="frosted">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Turismo
            </Typography>
            {['md'].map((expand) => (
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                        centered
                    >
                        <Tab as={Link} to={"/Home"} label="Home" />
                        <Tab as={Link} to={"/About"} label="About" />
                        <Tab value="three" label="Legal" disabled/>
                    </Tabs>
                </Box>
            ))}
            
            <Box sx={{ flexGrow: 1 }}>
                <TextField id="outlined-search" label="Search field" type="search" />
            </Box>

            <Box sx={{ flexGrow: 0 }}>        
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="A"/>
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
                  <MenuItem onClick={handleCloseUserMenu}><Typography sx={{ textAlign: 'center' }}>Profile</Typography></MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}><Typography sx={{ textAlign: 'center' }}>Dashboard</Typography></MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}><Typography sx={{ textAlign: 'center' }}>Log out</Typography></MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div>
                <Routes>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/home" element={<Home/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
  }