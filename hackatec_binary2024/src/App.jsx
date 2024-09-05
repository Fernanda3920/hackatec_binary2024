import { useState } from 'react'

import Header from './components/header/header'

import './App.css'

import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { amber, lightGreen } from '@mui/material/colors';

const customtheme = createTheme({
  palette: {
    mode: 'dark',
    contrastThreshold: 4.5,
    primary: {
      main: amber[500],
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: lightGreen[300],
      contrastText: '#FFFFFF',
    }
  },
  typography: {
    h6: {
      color: lightGreen[100]
    }
  }
});

function App() {

  return (
    <ThemeProvider theme={customtheme}>
      <Header/>
      <Router>
        
      </Router>
    </ThemeProvider>
  )
}

export default App
