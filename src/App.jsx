import NavBar from './NavBar.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import './App.css'
import { ThemeContext } from './DarkThemeContext.jsx'
import React, { useEffect, useState } from "react"
import Trainpage from './trainpage1.jsx'
import {seedDatabaseIfEmpty} from './data/db.js'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  function toggleDarkMode() {
    setDarkMode(darkMode => !darkMode)
  }

  useEffect(() => {
    document.body.className = darkMode ? "text-white" : "text-dark";
    document.body.style.backgroundColor = darkMode ? "#191d21" : "#f8f9fa";
    document.body.style.paddingTop ="60px"
  }, [darkMode])

  useEffect(() => {
    seedDatabaseIfEmpty();
  }, []);

  

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <NavBar />
      <Trainpage/>
      
    </ThemeContext.Provider>
  )
}

export default App