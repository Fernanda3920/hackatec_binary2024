import { useState } from 'react'

import Header from './components/header/header'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { blue, cyan } from '@mui/material/colors';

const customtheme = createTheme({
  palette: {
    mode: 'dark',
    primary: blue,
    secondary: cyan,
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
