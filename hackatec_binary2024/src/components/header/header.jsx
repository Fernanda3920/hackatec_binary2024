import React from "react";
import "./header.css"

import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";

import Login from '../login/login.jsx';
import Register from '../register/register.jsx';
import ResetPassword from '../resetpassword/resetpassword.jsx'
import PostsList from '../postslist/postslist.jsx';
import Post from '../post/post.jsx';
import PostDetail from '../postdetail/postdetail.jsx';
import About from '../about/about.jsx';
import MyReservation from './MyReservation/MyReservation.jsx';
import Map from '../map/map.jsx';
import Home from '../home/home.jsx';
import Postlistmodal from "./postlistmodal/postlistmodal.jsx";

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

import AdbIcon from '@mui/icons-material/Adb';

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
            <h3>
                <img src="image.jpg" alt="  HORIZON360"/>
            </h3>
            {['md'].map((expand) => (
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        centered
                    >
                        <Tab as={Link} to={"/Home"} label="Home" />
                        <Tab as={Link} to={"/Postslist"} label="Posts" />
                        <Tab as={Link} to={"/Map"} label="Map" />
                        <Tab as={Link} to={"/About"} label="About" />
                        <Tab as={Link} to={"/postlistmodal"} label="Postlistmodal" />
                        <Tab label="Legal" disabled/>
                    </Tabs>
                </Box>
            ))}
            
            <Box sx={{ flexGrow: 1 }}>
                <TextField id="outlined-search" label="Search field" type="search" />
            </Box>

            {['md'].map((expand) => (
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
                  <MenuItem as={Link} to={"/login"} onClick={handleCloseUserMenu}><Typography sx={{ textAlign: 'center' }}>Log in</Typography></MenuItem>
                  <MenuItem as={Link} to={"/register"} onClick={handleCloseUserMenu}><Typography sx={{ textAlign: 'center' }}>Register</Typography></MenuItem>
                  <MenuItem as={Link} to={"/myreservation"} onClick={handleCloseUserMenu}><Typography sx={{ textAlign: 'center' }}>My reservations</Typography></MenuItem>
                  <MenuItem as={Link} to={"/reset-password"} onClick={handleCloseUserMenu}><Typography sx={{ textAlign: 'center' }}>Forgot your password?</Typography></MenuItem>
              </Menu>
            </Box>
            ))}
          </Toolbar>
        </Container>
      </AppBar>
      <div>
                <Routes>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/register" element={<Register/>}/>
                  <Route path="/reset-password" element={<ResetPassword/>}/>
                  <Route path="/postslist" element={<PostsList/>}/>
                  <Route path="/post" element={<Post/>}/>
                  <Route path="/post/:id" element={<PostDetail/>}/>
                  <Route path="/map" element={<Map/>}/>
                  <Route path="/myreservation" element={<MyReservation/>}/>
                  <Route path="/about" element={<About/>}/>
                  <Route path="/home" element={<Home/>}/>
                  <Route path="/postlistmodal" element={<Postlistmodal/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
  }