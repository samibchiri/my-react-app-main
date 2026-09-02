import React, { useContext, useState, useEffect } from "react"; // removed 'use'

import { ThemeContext } from '../../context/DarkThemeContext.jsx';

import '../../styling/index.css';

function NavCpBar({showCpGrid,showAltBarClicked,setShowCpGrid,setShowAltBarClicked}){
    
       const ContinueButtonstyle = {
        alignItems: "center",
        fontWeight: "bold",
        borderWidth: "2px",
        height: "50px"
    }

    const { darkMode } = useContext(ThemeContext)

    console.log("ShowNavCpBar")
    
    const [navClicked,setNavClicked]= useState(false)


    const handleNavClicked = (Location)=>{

        console.log("NavClicked")
        setNavClicked(true)
        if(Location=="Cp"){
            setShowCpGrid(true)
            setShowAltBarClicked(false)
        }
        else{
            setShowCpGrid(false)
        }
        
        if(Location=="Bar"){
            setShowAltBarClicked(false)
        }
        if(Location=="Alt"){
            setShowAltBarClicked(true)
        }
        setTimeout(() => {
            console.log("NavClicked2")
            setNavClicked(false)
        }, 0);
    }

    console.log("Buttons",navClicked,showCpGrid,showAltBarClicked)
    return (

    <div className="NavCpBarCont">
        <button onClick={()=>{handleNavClicked("Cp")}} className={`${darkMode ? "btn-dark border-3 btn-back-dark" : "btn-secondary border-3 border-dark btn-back-light"} border border-2 btn `}
        style={{
            ...ContinueButtonstyle,

            "--bs-border-style": "solid",
            "--bs-border-color": "white",
            "--bs-btn-hover-border-color": "red",
            "--bs-btn-focus-border-color": "red",
            "--bs-btn-active-border-color": "red",
            
        }}
        disabled={navClicked||showCpGrid}
        >
        <h3 className="ContinueRecTrainCont">Show Cp Rec</h3>
    </button>
        <button onClick={()=>{handleNavClicked("Bar")}} className={`${darkMode ? "btn-dark border-3 btn-back-dark" : "btn-secondary border-3 border-dark btn-back-light"} border border-2 btn `}
        style={{
            ...ContinueButtonstyle,

            "--bs-border-style": "solid",
            "--bs-border-color": "white",
            "--bs-btn-hover-border-color": "red",
            "--bs-btn-focus-border-color": "red",
            "--bs-btn-active-border-color": "red",
        }}
        disabled={navClicked || (!showCpGrid && !showAltBarClicked)}
        >
            
        <h3 className="ContinueRecTrainCont">Show Bar Rec</h3>
        
    </button>

    <button onClick={()=>{handleNavClicked("Alt")}} className={`${darkMode ? "btn-dark border-3 btn-back-dark" : "btn-secondary border-3 border-dark btn-back-light"} border border-2 btn `}
        style={{
            ...ContinueButtonstyle,

            "--bs-border-style": "solid",
            "--bs-border-color": "white",
            "--bs-btn-hover-border-color": "red",
            "--bs-btn-focus-border-color": "red",
            "--bs-btn-active-border-color": "red",
        }}
         disabled={navClicked || (!showCpGrid && showAltBarClicked)}
        >
            
        <h3 className="ContinueRecTrainCont">Show Alt Bar Rec</h3>
        
    </button>
    </div>
    )
     
}

export default NavCpBar