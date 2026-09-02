
import React, { useContext, useState, useEffect } from "react"; // removed 'use'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import CaseImage from "../../components/Oll/cubing/cubeImage.jsx";

import TestPage from '../TestPage/TestPage.jsx';
import CornerPermutationPage from '../CpPage/CornerPermutationPage.jsx';
//import ArrowDataGenerator from '../../dataGeneration/ArrowDataGenerator.jsx'
import cpllCaseSet from "../../data/cpllCaseSet.js";
import eollCaseSet from "../../data/eollCaseSet.js";
import epllCaseSet from "../../data/epllCaseSet.js";
import f2lCaseSet from "../../data/f2l1CaseSet.js";
import ocllCaseSet from "../../data/ocllCaseSet.js";
import ollCaseSet from "../../data/ollCaseSet.js";
import pllCaseSet from "../../data/pllCaseSet.js";
import BarPersevation from '../BarPersevationPage/BarPersevationPage.jsx';

// Bootstrap CSS fir-st
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FaIcon } from '../../assets/fontAwesome.js';

// Your custom CSS after Bootstrap
import '../../styling/App.css';
import '../../styling/index.css';
import '../../styling/PopUp.css';

import { ThemeContext } from '../../context/DarkThemeContext.jsx';

import BarPersevationOverlay from "../../1OllBarInfo.jsx";

import { LabsLastSlotButton } from "./LabsLastSlotButton.jsx"; 


export function LabsOllGroupButton({text,subtext}){



    const { darkMode } = useContext(ThemeContext)

    const ContinueButtonstyle = {
        alignItems: "center",
        fontWeight: "bold",
        borderWidth: "2px",
    }

    return(
  <button  className={`LabsOLLGroupButton ${darkMode ? "btn-dark border-3 btn-back-dark" : "btn-secondary border-3 border-dark btn-back-light"} border border-2 btn `}
                                   
                                   style={{
                                 
                                        ...ContinueButtonstyle,

                                        "--bs-border-style": "solid",
                                        "--bs-border-color": "white",
                                        "--bs-btn-hover-border-color": "red",
                                        "--bs-btn-focus-border-color": "red",
                                        "--bs-btn-active-border-color": "red",
                                    
                                                            }}
                                                            >
                                                                <div><span>{text}</span></div>
                                                            <span style={{fontSize:"0.7rem"}}>{subtext}</span>
                                                            </button>
    )
}


export function LabsOllAlgButton({text, lastslot,oll, pll}){



    const { darkMode } = useContext(ThemeContext)

    const ContinueButtonstyle = {
        alignItems: "center",
        fontWeight: "bold",
        borderWidth: "2px",
        height: "50px",
        width: "100px"
    }

    let alg= oll

    return(
        <>
        
       
  <button  className={`LabsOllAlgButton ${darkMode ? "btn-dark border-3 btn-back-dark" : "btn-secondary border-3 border-dark btn-back-light"} border border-2 btn `}
                                   
                                   style={{
                                 
                                        ...ContinueButtonstyle,
                                        display:"flex",
                                        alignItems:"center",
                                        justifyContent:"center",
                                        gap:"10px",
                                        "--bs-border-style": "solid",
                                        "--bs-border-color": "white",
                                        "--bs-btn-hover-border-color": "red",
                                        "--bs-btn-focus-border-color": "red",
                                        "--bs-btn-active-border-color": "red",
                                    
                                                            }}
                                                            >{text}<BarPersevationOverlay
                        oll={""}
                        pll={alg}
                        permIndex={1}
                        cpEasyWanted={false}
                        cpSameOppWanted={false}
                        barMovementWanted={false}
                        cubeSize={40}
                        
                        cubeSizeFixed={true}
                        />
                                                            
                                                            </button>
     </>
)
}

export function LabsPllGroupButton({text}){
    

    const { darkMode } = useContext(ThemeContext)

    const ContinueButtonstyle = {
        alignItems: "center",
        fontWeight: "bold",
        borderWidth: "2px",
    }

    return(
  <button  className={`LabsPLLGroupButton ${darkMode ? "btn-dark border-3 btn-back-dark" : "btn-secondary border-3 border-dark btn-back-light"} border border-2 btn `}
                                   
                                   style={{
                                 
                                        ...ContinueButtonstyle,

                                        "--bs-border-style": "solid",
                                        "--bs-border-color": "white",
                                        "--bs-btn-hover-border-color": "red",
                                        "--bs-btn-focus-border-color": "red",
                                        "--bs-btn-active-border-color": "red",
                                    
                                                            }}
                                                            >
                                                                <div><span>{text}</span></div>
                                                            
                                                            </button>
    )
}

export function LabsCellCopyNumber({text}){
 


    const { darkMode } = useContext(ThemeContext)

    const ContinueButtonstyle = {
        alignItems: "center",
        fontWeight: "bold",
        borderWidth: "2px",
        height: "50px",
        width: "100px"
    }

    return(
        <>
        
       
  <button  className={`LabsAlgCopyNumberButton ${darkMode ? "btn-dark border-3 btn-back-dark" : "btn-secondary border-3 border-dark btn-back-light"} border border-2 btn `}
                                   
                                   style={{
                                 
                                        ...ContinueButtonstyle,
                                        display:"flex",
                                        alignItems:"center",
                                        justifyContent:"center",
                                        gap:"10px",
                                        "--bs-border-style": "solid",
                                        "--bs-border-color": "white",
                                        "--bs-btn-hover-border-color": "red",
                                        "--bs-btn-focus-border-color": "red",
                                        "--bs-btn-active-border-color": "red",
                                    
                                                            }}
                                                            >{text}
                                                            
                                                            </button>
     </>
)   
}

export function AUFGrid(){

    return(
     <div className="LabsLastSlotGroupMenu">
    
                                                                
    <LabsLastSlotButton text={"No AUF"}></LabsLastSlotButton>
    <LabsLastSlotButton text={"U2"}></LabsLastSlotButton>
            <LabsLastSlotButton text={"U"}></LabsLastSlotButton>
    <LabsLastSlotButton text={"U'"}></LabsLastSlotButton>

</div>
    )
}


export default LabsOllGroupButton


