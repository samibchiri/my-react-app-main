import reactLogo from '../assets/react.svg';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useContext } from "react";
import { ThemeContext } from '../DarkThemeContext.jsx';
import '../styling/index.css';


function NavBar() {
  const context = useContext(ThemeContext);

  if (!context) {
    return <div style={{ color: 'red' }}>ThemeContext is undefined!</div>;
  }

  const { darkMode, toggleDarkMode } = context;

  return (
    <nav className={`navbar navbar-expand-sm fixed-top w-100 ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
      <a className="navbar-brand" href="https://google.com" target="_blank" rel="noopener noreferrer">
        Website
      </a>


      {<div className="d-flex d-sm-none ms-auto">

        <button className='text-secondary btn btn-link' onClick={toggleDarkMode}>
          {darkMode ? (
            <img src={reactLogo} className="svg-inline--fa fa-moon fa-lg" alt="React logo" />
          ) : (
            <img src={reactLogo} alt="React logo" />
          )}
        </button>
      </div>}

      <button id="dropDownMenu"
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className='navbar-collapse collapse' id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="https://google.com" target="_blank" rel="noopener noreferrer">Train</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://google.com" target="_blank" rel="noopener noreferrer">Time</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="https://google.com" target="_blank" rel="noopener noreferrer">Stats</a>
          </li>
        </ul>


        <div className='navbar-nav ms-auto'>
          <button className='align-right text-secondary btn btn-link' onClick={toggleDarkMode}>
            {darkMode ? (
              <img src={reactLogo} className="svg-inline--fa fa-moon fa-lg" alt="React logo" />
            ) : (
              <img src={viteLogo} alt="Vite logo" />
            )}
          </button>
          <ul className="navbar-nav">
            <li className='nav-item dropdown ms-ltr-5 list-unstyled'>
              <a className="dropdown-toggle nav-link" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                samibchiri@gmail.com
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Logout</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
