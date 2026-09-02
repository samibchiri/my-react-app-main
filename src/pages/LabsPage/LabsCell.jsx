
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

import { useLiveQuery } from "dexie-react-hooks";
import { db } from '../../data/NewGeneratedData/db.js';

import {sortOlls} from "../../context/OllContext.jsx"

import { ThemeContext } from '../../context/DarkThemeContext.jsx';
import ShowAlgCard from "../TrainSelectPage/cardPopUp.jsx";
import Bar6Grid from "../BarPersevationPage/Bar6Grid.jsx";

import Stopwatch from '../../components/Train/Stopwatch.jsx';

import BarPersevationOverlay from "../../1OllBarInfo.jsx";

import LabsOllGroupButton, {LabsOllAlgButton,LabsPllGroupButton, LabsCellCopyNumber, AUFGrid} from "./LabsOllGroupButton.jsx";
import { LabsLastSlotButton } from "./LabsLastSlotButton.jsx"; 

import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions.jsx";


export function LabsCell({cubeSize,setCubeSize,oll, LastSlotAlgs}){
     const { darkMode } = useContext(ThemeContext)
        
     const [caseClicked, setCaseClicked] = useState(false)
        const [buttonClicked, setButtonClicked] = useState(false)
        const [cpClicked, setCpClicked] = useState(false)
        const [barClicked, setBarClicked] = useState(false)
        const [caseItem, setCaseItem] = useState()
        const [showPopUpCard, setShowPopUpCard] = useState([])
        
        const [cpSameOpp,setCpSameOpp] = useState(false)
          
        
            const handleBackClicked = ()=>{
                navigate("/train")
            }
        
            const handleLastSlotClicked = ()=>{
        
            }
        
            const handlePreOLLClicked = ()=>{
                
            }
        
            const handleOLLClicked = ()=>{
                
            }
        
            const handlePrePLLClicked = ()=>{
                
            }
        
            const handlePLLClicked = ()=>{
                
            }
        
            const handlePostPLLClicked = ()=>{
                
            }
        
            const [cells, setCells] = useState([
            {
                id: "cell-1",
                ollRecSetting: "",
                lastSlotAlg: "",
                preOLLAUF: "",
                ollAlg: "",
                prePLLAUF: "",
                pllAlg: "",
                postPLLAUF: "",
                linkedCell: ""
            },
            {
                id: "cell-2",
                ollRecSetting: "",
                lastSlotAlg: "",
                preOLLAUF: "",
                ollAlg: "",
                prePLLAUF: "",
                pllAlg: "",
                postPLLAUF: "",
                linkedCell: ""
            }
        ]);

        const navigate = useNavigate();
        
        const buttonStyle = {
            width: "85%",
            height: "15vh",
            minHeight: "100px",
            color: darkMode ? "#ffffffff" : "#000000ff", // dark text for light grey, white text for dark
    
    
    
    
        };
    
        const BackButtonstyle = {
            width: "75px",
            height: "40px",
            alignItems: "center",
            fontWeight: "bold",
            borderWidth: "2px",
    
        }
    
        const HintButtonstyle = {
            width: "75px",
            height: "40px",
            alignItems: "center",
            fontWeight: "bold",
            borderWidth: "2px",
            
        }
    
        const ContinueButtonstyle = {
            alignItems: "center",
            fontWeight: "bold",
            borderWidth: "2px",
            height: "50px",
        }
    
    
        const tableCellDark = {
            backgroundColor: "#ffffff"
        }
    
        const tableCellLight = {
            backgroundColor: "#000000"
    
        }

        const dbOllCaseSet = useLiveQuery(()=>{
                
                  return db.olls.where("algNumber").equals(0).toArray().then(arr => arr.sort(sortOlls));;
                },[]
              );

    return (
        <div className="LabsCell">
                                    <div className="LabsTrashButtonCont">
                                        <button className='LabsTrashButton'>
                                                                            <FaIcon icon="trash" style={{ color: "white", fontSize: "20px" }} />
                                                                        </button>
        
                                    </div>
                                    <div className="LabsCopyButtonCont">
                                            <div className="LabsCellNumberCont">
                                                <h4 className="LabsCellNumber">22</h4>
                                            </div>
                                            
                                            <div className='navbar-nav ms-auto'>
                                                    <ul className="navbar-nav">
                                                      <li className='nav-item dropdown ms-ltr-5 list-unstyled'>
                                            
                                            
                                            <button className={`LabsCopyButton dropdown-toggle ${darkMode ? "btn-dark border-2 btn-back-dark" : "btn-secondary border-2 border-dark btn-back-light"} border border-2 btn `}
                                             data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                                data-bs-auto-close="outside"
                                                >
                                                <FaIcon icon="copy"></FaIcon>
                                            </button>
                                            <ul className="dropdown-menu LabsCellNumberDropdownCont">
                                                <h4 className="LabsCellCopyNumberHeader">Which cell <br></br>to copy? </h4>
                                                   <li>
                                                    <hr className="dropdown-divider LabsCellCopyNumberDivider" />
                                                </li>
        
                                                <li className="LabsCellCopyNumberCont">
                                                    <LabsCellCopyNumber text={"111"}></LabsCellCopyNumber>
              
                                                    <LabsCellCopyNumber text={"111"}></LabsCellCopyNumber>
        
                                                    <LabsCellCopyNumber text={"111"}></LabsCellCopyNumber>
                                                    
                                                    <LabsCellCopyNumber text={"111"}></LabsCellCopyNumber>
        
                                                    <LabsCellCopyNumber text={"111"}></LabsCellCopyNumber>
        
                                                    <LabsCellCopyNumber text={"111"}></LabsCellCopyNumber>
                                                                   
                                            </li>
        
        
                                             </ul>
                                            </li>
                                            </ul>
                                            </div>
                                            <div className='navbar-nav ms-auto'>
                                                    <ul className="navbar-nav">
                                                      <li className='nav-item dropdown ms-ltr-5 list-unstyled'>
                                            
                                            
                                            <button className={`LabsLinkButton dropdown-toggle ${darkMode ? "btn-dark border-2 btn-back-dark" : "btn-secondary border-2 border-dark btn-back-light"} border border-2 btn `}
                                             data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                                data-bs-auto-close="outside"
                                                >
                                                <FaIcon icon="link"></FaIcon>
                                            </button>
                                            <ul className="dropdown-menu LabsLinkDropdownCont">
                                                <div className="CellLinkQuestionCont">
                                                        <h4 className="LabsCellCopyNumberHeader">Which part <br></br>to link? <button className="LabsHintChainButton"><FaIcon icon="question"></FaIcon></button></h4>
                                                         
                                                    <LabsLastSlotButton text={"Last Slot"}></LabsLastSlotButton>
                                                    <div style={{marginTop:"10px"}}></div>
                                                    <LabsLastSlotButton text={"Oll"}></LabsLastSlotButton>

        
                                                </div>
                                                <li style={{marginTop:"20px"}}>
                                                    <hr className="dropdown-divider LabsCellCopyNumberDivider" />
                                                </li>
                                                <h4 className="LabsCellCopyNumberHeader">Which cell <br></br>to link? </h4>
                                                   <li>
                                                    <hr className="dropdown-divider LabsCellCopyNumberDivider" />
                                                </li>
        
                                                <li className="LabsCellCopyNumberCont">
                                                    <LabsCellCopyNumber text={"111"}></LabsCellCopyNumber>
              
                                                    <LabsCellCopyNumber text={"111"}></LabsCellCopyNumber>
        
                                                    <LabsCellCopyNumber text={"111"}></LabsCellCopyNumber>
                                                    
                                                    <LabsCellCopyNumber text={"111"}></LabsCellCopyNumber>
        
                                                    <LabsCellCopyNumber text={"111"}></LabsCellCopyNumber>
        
                                                    <LabsCellCopyNumber text={"111"}></LabsCellCopyNumber>
                                                                   
                                            </li>
        
        
                                             </ul>
                                            </li>
                                            </ul>
                                            </div>
                                        </div>
        
        
                                    <div className="LabsPopUpCont" >
                                        
                                        <div className='navbar-nav ms-auto'>
                                                    <ul className="navbar-nav">
                                                      <li className='nav-item dropdown ms-ltr-5 list-unstyled'>
                                            <button  className={`LabsInfoButton dropdown-toggle ${darkMode ? "btn-dark border-2 btn-back-dark" : "btn-secondary border-2 border-dark btn-back-light"} border border-2 btn `}  
                                                 onClick={()=>{console.log("Clicked")}}
                                                id="navbarDropdown"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                                data-bs-auto-close="outside"
                                                
                                            >
                                                
                                            </button>
                                                        <ul className={`LabsDropDownMenu dropdown-menu`} aria-labelledby="navbarDropdown">
                                                        <li className="dropdown LabsNestedDropdown">
        
                                                            <button  className="dropdown-item LabsDropDownItem dropdown-toggle"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        style={{borderTopLeftRadius:"6px",borderTopRightRadius:"6px"}}
                                                        >Oll Recognition</button>
        
                    
                                                                              <div className="dropdown-menu LabsLastSlotGroupCont" >
                                                            <div className="LabsLastSlotGroupMenu">
                                                               
                                                                                                                           
                                                               <LabsLastSlotButton text={"Nothing"}></LabsLastSlotButton>
                                                               <LabsLastSlotButton text={"Bar Movement"}></LabsLastSlotButton>
                                                                       <LabsLastSlotButton text={"Cp Easy"}></LabsLastSlotButton>
                                                               <LabsLastSlotButton text={"Cp Same Opp"}></LabsLastSlotButton>
                                                           
                                                           </div>
                                                                  
                                                        </div>
                                                        </li>
                                                        <li><hr className="dropdown-divider" /></li>
                                                        <li style={{marginTop:"30px"}}>
                                                             <button disabled={true} className="dropdown-item LabsDropDownItem"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        style={{fontWeight:"700", borderBottomLeftRadius:"6px",borderBottomRightRadius:"6px"}}
                                                        >Setup</button>
                                                        </li>
                                                        <li><hr className="dropdown-divider" /></li>
                                                        <li className="dropdown LabsNestedDropdown">
        
                                                            <button  className="dropdown-item LabsDropDownItem dropdown-toggle"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        style={{borderTopLeftRadius:"6px",borderTopRightRadius:"6px"}}
                                                        >Last Slot</button>
        
                                                        <div className="dropdown-menu LabsLastSlotGroupCont" >
                                                            <div className="LabsLastSlotGroupMenu">
        
                                                            
                                                                {LastSlotAlgs.map((alg)=>(
                                                                    <LabsLastSlotButton text={alg}></LabsLastSlotButton>
                                                                ))}
                                                                
                                                                </div>
                                                                   <div className="LabsLastSlotInputCont">
                                                                         <input className="LastSlotCustomInput"></input>
                                                                    <div id="buttonSaveAndCopy1">
                                                                    
                                                                    <button className="LabsLastSlotButtonSave" >Save
                                                                    </button>
                                                                   </div>
                                                                  
                                                                
                                                                        </div>
                                                        </div>
                                                                             <div className="dropdown-menu LabsLastSlotGroupCont" >
                                                            <div className="LabsLastSlotGroupMenu">
        
                                                            
                                                                   <LabsLastSlotButton text={"Hi"}></LabsLastSlotButton>
                                                                   <LabsLastSlotButton text={"Bye"}></LabsLastSlotButton>
                                                                          <LabsLastSlotButton text={"Hi"}></LabsLastSlotButton>
                                                                   <LabsLastSlotButton text={"Bye"}></LabsLastSlotButton>
        
                                                                </div>
                                                                   <div className="LabsLastSlotInputCont">
                                                                         <input className="LastSlotCustomInput"></input>
                                                                    <div id="buttonSaveAndCopy1">
                                                                    
                                                                    <button className="LabsLastSlotButtonSave" >Save
                                                                    </button>
                                                                   </div>
                                                                  
                                                                
                                                                        </div>
                                                        </div>
                                                        </li>
        
                                                        <li><hr className="dropdown-divider" /></li>
        
                                                        <li className="dropdown LabsNestedDropdown">
        
                                                            <button  className="dropdown-item LabsDropDownItem dropdown-toggle"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        style={{borderTopLeftRadius:"6px",borderTopRightRadius:"6px"}}
                                                        >Oll Pre-AUF</button>
        
                    
                                                                              <div className="dropdown-menu LabsLastSlotGroupCont" >
                                                           {AUFGrid()}
                                                                  
                                                        </div>
                                                        </li>
        
                                                       <li><hr className="dropdown-divider" /></li>
        
                                                          <li className="dropdown LabsNestedDropdown">
        
                                                            <button  className="dropdown-item LabsDropDownItem dropdown-toggle"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        style={{borderTopLeftRadius:"6px",borderTopRightRadius:"6px"}}
                                                        >OLL Group</button>
                                                                {/* <div className="dropdown-menu LabsOLLMenu"> */}
                                                                
                                                                <div style={{}} className="dropdown-menu LabsOLLGroupMenu">
                                                                    {/* <button  className={`LabsGroupButton ${darkMode ? "btn-dark border-3 btn-back-dark" : "btn-secondary border-3 border-dark btn-back-light"} border border-2 btn `}
                                           
                                           style={{
                                         
                                                ...ContinueButtonstyle,
        
                                                "--bs-border-style": "solid",
                                                "--bs-border-color": "white",
                                                "--bs-btn-hover-border-color": "red",
                                                "--bs-btn-focus-border-color": "red",
                                                "--bs-btn-active-border-color": "red",
                                            
                                                                    }}
                                                                    >Group 1</button> */}
                                                                    <LabsOllGroupButton text={"Group 1"} subtext={"Small Bolt"}></LabsOllGroupButton>
                                                                    <LabsOllGroupButton text={"Group 2"} subtext={"Knight Move"}></LabsOllGroupButton>
                                                                    <LabsOllGroupButton text={"Group 3"}></LabsOllGroupButton>
                                                                    <LabsOllGroupButton text={"Group 4"}></LabsOllGroupButton>
                                                                    <LabsOllGroupButton text={"Group 5"}></LabsOllGroupButton>
                                                                    <LabsOllGroupButton text={"Group 6"}></LabsOllGroupButton>
                                                                    <LabsOllGroupButton text={"Group 7"}></LabsOllGroupButton>
                                                                    <LabsOllGroupButton text={"Group 8"}></LabsOllGroupButton>
                                                                    <LabsOllGroupButton text={"Group 9"}></LabsOllGroupButton>
                                                                    <LabsOllGroupButton text={"Group 10"}></LabsOllGroupButton>
                                                                    <LabsOllGroupButton text={"Group 11"}></LabsOllGroupButton>
                                                                    <LabsOllGroupButton text={"Group 12"}></LabsOllGroupButton>
                                                                    <LabsOllGroupButton text={"Group 13"}></LabsOllGroupButton>
                                                                    <LabsOllGroupButton text={"Group 14"}></LabsOllGroupButton>
                                                                    <LabsOllGroupButton text={"Group 15"} subtext={"Knight Move"}></LabsOllGroupButton>
                                                                </div>
        
                                                                <div className="dropdown-menu LabsOLLAlgMenu ">
                                                                    {/* <button  className={`LabsGroupButton ${darkMode ? "btn-dark border-3 btn-back-dark" : "btn-secondary border-3 border-dark btn-back-light"} border border-2 btn `}
                                           
                                           style={{
                                         
                                                ...ContinueButtonstyle,
        
                                                "--bs-border-style": "solid",
                                                "--bs-border-color": "white",
                                                "--bs-btn-hover-border-color": "red",
                                                "--bs-btn-focus-border-color": "red",
                                                "--bs-btn-active-border-color": "red",
                                            
                                                                    }}
                                                                    >Group 1</button> */}
                                                                    <LabsOllAlgButton text={"Alg 111"} oll={"R U R' U R U2 R' "}></LabsOllAlgButton>
                                                                   
                                                                    <LabsOllAlgButton text={"Alg 2"} oll={"R U R' U R U2 R' "}></LabsOllAlgButton>
                                                                    <LabsOllAlgButton text={"Alg 3"} oll={"R U R' U R U2 R' "}></LabsOllAlgButton>
                                                                    <LabsOllAlgButton text={"Alg 4"} oll={"R U R' U R U2 R' "}></LabsOllAlgButton>
                                                                    <LabsOllAlgButton text={"Alg 5"} oll={"R U R' U R U2 R' "}></LabsOllAlgButton>
                                                                    <LabsOllAlgButton text={"Alg 6"} oll={"R U R' U R U2 R' "}></LabsOllAlgButton>
                                                                    <LabsOllAlgButton text={"Alg 7"} oll={"R U R' U R U2 R' "}></LabsOllAlgButton>
                                                                    <LabsOllAlgButton text={"Alg 8"} oll={"R U R' U R U2 R' "}></LabsOllAlgButton>
                                                                </div>
        {/* 
                                                                <hr className="dropdown-divider" />
        
                                                                <div className="LabsOLLGrid">
                                                                    <button>OLL 51</button>
                                                                    <button>OLL 52</button>
                                                                    <button>OLL 53</button>
                                                                    <button>OLL 54</button>
                                                                    <button>OLL 55</button>
                                                                    <button>OLL 56</button>
                                                                </div> */}
        
                                                            {/* </div> */}
                                                          </li>
                                                          <li><hr className="dropdown-divider" /></li>
                                                           <li className="dropdown LabsNestedDropdown">
        
                                                            <button  className="dropdown-item LabsDropDownItem dropdown-toggle"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        style={{borderTopLeftRadius:"6px",borderTopRightRadius:"6px"}}
                                                        >PLL Pre-AUF</button>
        
                    
                                                                            <div className="dropdown-menu LabsLastSlotGroupCont" >
                                                           {AUFGrid()}
                                                                  
                                                        </div>
                                                                  
                                                        
                                                        </li>
        
                                                       <li><hr className="dropdown-divider" /></li>
        
                                                            <li className="dropdown LabsNestedDropdown">
        
                                                            <button  className="dropdown-item LabsDropDownItem dropdown-toggle"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        style={{borderTopLeftRadius:"6px",borderTopRightRadius:"6px"}}
                                                        >PLL Group</button>
                                                                {/* <div className="dropdown-menu LabsOLLMenu"> */}
        
                                                                <div style={{}} className="dropdown-menu LabsPLLGroupMenu">
                                                                    {/* <button  className={`LabsGroupButton ${darkMode ? "btn-dark border-3 btn-back-dark" : "btn-secondary border-3 border-dark btn-back-light"} border border-2 btn `}
                                           
                                           style={{
                                         
                                                ...ContinueButtonstyle,
        
                                                "--bs-border-style": "solid",
                                                "--bs-border-color": "white",
                                                "--bs-btn-hover-border-color": "red",
                                                "--bs-btn-focus-border-color": "red",
                                                "--bs-btn-active-border-color": "red",
                                            
                                                                    }}
                                                                    >Group 1</button> */}
                                                                    <LabsPllGroupButton text="E" />
                                                                    <LabsPllGroupButton text="Ua" />
                                                                    <LabsPllGroupButton text="Ra" />
                                                                    <LabsPllGroupButton text="T" />
                                                                    <LabsPllGroupButton text="Ga" />
                                                                    
                                                                    <LabsPllGroupButton text="Na" />
                                                                    <LabsPllGroupButton text="Ub" />
                                                                    <LabsPllGroupButton text="Rb" />
                                                                    <LabsPllGroupButton text="F" />
                                                                    <LabsPllGroupButton text="Gb" />
                                                                    
                                                                    <LabsPllGroupButton text="Nb" />
                                                                    <LabsPllGroupButton text="H" />
                                                                    <LabsPllGroupButton text="Ja" />
                                                                    <LabsPllGroupButton text="Aa" />
                                                                    <LabsPllGroupButton text="Gc" />
                                                                    
                                                                    <LabsPllGroupButton text="V" />
                                                                    <LabsPllGroupButton text="Z" />
                                                                    <LabsPllGroupButton text="Jb" />
                                                                    <LabsPllGroupButton text="Ab" />
                                                                    <LabsPllGroupButton text="Gd" />
        
                                                                    <LabsPllGroupButton text="Y" />
            
                                                                </div>
        
                                                             
                                                          </li>
                                                          <li><hr className="dropdown-divider" /></li>
                                                           <li className="dropdown LabsNestedDropdown">
        
                                                            <button  className="dropdown-item LabsDropDownItem dropdown-toggle"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        style={{borderTopLeftRadius:"6px",borderTopRightRadius:"6px"}}
                                                        >PLL Post-AUF</button>
        
                    
                                                                             <div className="dropdown-menu LabsLastSlotGroupCont" >
                                                           {AUFGrid()}
                                                                  
                                                        </div>
                                                        </li>
                                                        <li><hr className="dropdown-divider" /></li>
                                                        <li className="dropdown LabsNestedDropdown" style={{marginTop:"20px"}}>
                                                             <button  className="dropdown-item LabsDropDownItem dropdown-toggle"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        style={{borderBottomLeftRadius:"6px",borderBottomRightRadius:"6px"}}
                                                        >Algs to Solve</button>
        
                                                        <div className="dropdown-menu LabsSolveInputCont">
                                                            
                                                                <div className="d-flex align-items-center">
                                                                     <label style={{color:"white",marginRight:"auto"}} htmlFor="LastSlotSolveAlg">Last Slot:</label>
                                                                      <input id="LastSlotSolveAlg" name="LastSlotSolveAlg" className="LastSlotSolveInput"></input>
                                                                </div>

                                                                <div className="d-flex align-items-center">
                                                                     <label style={{color:"white",marginRight:"auto"}} htmlFor="OLLSolveAlg">OLL:</label>
                                                                      <input id="OLLSolveAlg" name="OLLSolveAlg" className="LastSlotSolveInput"></input>
                                                                </div>

                                                                <div className="d-flex align-items-center">
                                                                     <label style={{color:"white", marginRight:"auto"}} htmlFor="PLLSolveAlg">PLL:</label>
                                                                      <input id="PLLSolveAlg" name="PLLSolveAlg" className="LastSlotSolveInput"></input>
                                                                </div>


                                                                <div className="d-flex justify-content-center" style={{marginTop:"10px"}}>
                                                                <button className="barExcludeButtonSave"> Save</button>
                                                                </div>

                                                        </div>
                                                        </li>
                                                        
                                                        
                                                        <li><hr className="dropdown-divider" /></li>
                                                        <li style={{marginTop:"30px"}}>
                                                             <button  className="dropdown-item LabsDropDownItem"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        style={{fontWeight:"700", borderBottomLeftRadius:"6px",borderBottomRightRadius:"6px"}}
                                                        >Reset to Default</button>
                                                        </li>
        
                                                     
                                                        </ul>
                                                      </li>
                                                    </ul>
                                                  </div>
                                    </div>
                                    {dbOllCaseSet && oll && <BarPersevationOverlay
                                    oll={oll}
                                    pll={""}
                                    permIndex={1}
                                    cpEasyWanted={false}
                                    cpSameOppWanted={!cpSameOpp}
                                    barMovementWanted={false}
                                    cubeSize={cubeSize}
                                    setCubeSize={setCubeSize}
                                    cubeSizeFixed={true}
                                    />
                                }
                                </div>
    )
    
}


export function AddLabsCell(){


    const { darkMode } = useContext(ThemeContext)

    return (
        <div className="AddLabsCellCont d-flex align-items-center justify-content-center" >
        
            <button className={`AddLabsCellButton ${darkMode ? "btn-dark border-2 btn-back-dark" : "btn-secondary border-2 border-dark btn-back-light"} border border-2 btn `}
                data-bs-toggle="dropdown"
                aria-expanded="false"
                data-bs-auto-close="outside"
                >
                <FaIcon icon="plus"  fontSize="3rem"></FaIcon>
            </button>

        </div>
    )
}


export default LabsCell