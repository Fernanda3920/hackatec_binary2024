import { useState } from 'react'

import Header from './components/header/header'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <Router>
      
    </Router>
    </>
  )
}

export default App
