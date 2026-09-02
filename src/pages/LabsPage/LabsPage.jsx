
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

import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions.jsx";

import LabsOllGroupButton, {LabsOllAlgButton,LabsPllGroupButton, LabsCellCopyNumber, AUFGrid} from "./LabsOllGroupButton.jsx";
import { LabsLastSlotButton } from "./LabsLastSlotButton.jsx"; 
import LabsCell from "./LabsCell.jsx";
import Labs2CellGrid, {Labs4CellLastSlotGrid, Labs4CellPLLGrid} from "./LabsGrids.jsx";


export default function CpTrainerPage(){
    const { darkMode } = useContext(ThemeContext)
    const [caseClicked, setCaseClicked] = useState(false)
    const [buttonClicked, setButtonClicked] = useState(false)
    const [cpClicked, setCpClicked] = useState(false)
    const [barClicked, setBarClicked] = useState(false)
    const [caseItem, setCaseItem] = useState()
    const [showPopUpCard, setShowPopUpCard] = useState([])
    
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

    const [selectedCaseSet, setSelectedCaseSet] = useState(ollCaseSet)

    let AllCases = [cpllCaseSet, eollCaseSet, epllCaseSet, f2lCaseSet, ocllCaseSet, ollCaseSet, pllCaseSet]

    let dCrossShown = true

    const { xs } = useWindowDimensions();
    const cubeImageSize = xs ? "100" : "120";

    const [cubeSize, setCubeSize] = useState(300);
    console.log("CuSize",cubeSize)
    const [openGroups, setOpenGroups] = useState({});
    const [selectedAlg, setSelectedAlg] = useState([])
    const [algCasesSet, setAlgCasesSet] = useState(ollCaseSet)
    const [AlgGroups, setAlgGroups] = useState([]);

    const [cpSameOpp,setCpSameOpp] = useState(false)
    const [recAnswered,setRecAnswered] = useState(false)

    const handleBackClicked = ()=>{
        navigate("/train")
    }

    const handleCellChange= (cellNumber,toChange, newAlg)=>{

    }

    const [cells, setCells] = useState([
    {
        id: "cell-1",
        cellNumber: 1,
        ollRecSetting: "",
        lastSlotAlgSetup: "",
        preOLLAUFSetup: "",
        ollAlgSetup: "",
        prePLLAUFSetup: "",
        pllAlgSetup: "",
        postPLLAUFSetup: "",
        lastSlotAlgSolve:"",
        OLLAlgSolve:"",
        PLLAlgSolve:"",
        lastSlotGridNumber:"",
        PLLGridNumber:"",
        linkedCell: [1,"LastSlot"]
    },
    {
        id: "cell-2",
        cellNumber: 2,
        ollRecSetting: "",
        lastSlotAlgSetup: "",
        preOLLAUFSetup: "",
        ollAlgSetup: "",
        prePLLAUFSetup: "",
        pllAlgSetup: "",
        postPLLAUFSetup: "",
        lastSlotAlgSolve:"",
        OLLAlgSolve:"",
        PLLAlgSolve:"",
        lastSlotGridNumber:"",
        PLLGridNumber:"",
        linkedCell: [1,"LastSlot"]
    }
]);

    const [unLinkable, setUnlinkable] = useState([])

    const ScrambleDetails = {
        id: "oll",
        title: "OLL",
        subTitle: "Full OLL",
        view: "plan",
        numCases: 57,
    }
    const ScrambleVisualizerDetails = {
        id: "oll",
        title: "OLL",
        subTitle: "Full OLL",
        view: "plan",
        stage: "cross",
        numCases: 57,
    }

    let scramble = "F L2 U2 L2 R2 B2 L2 U2 R2 F R2 F U L' F R2 B2 F2 R2 U' B D2 L"
    let oll = dbOllCaseSet?dbOllCaseSet[0]:""
    console.log("Oll",oll)
    let j=0

    const LastSlotAlgs=["R U' R'", "L U L'","R U R'","L U' L'","R U2 R'", "L U2 L'", "R' F R F'", "L F' L' F"]

    return <>
            <div className='TestContainersCont'>

                <div className='Timercontainer '>
                    <div className='TestButtonsCont row align-items-center d-flex alignItems:"center"'>
                        <div style={{ height: "50px", alignItems: "center" }} className='col p-0 justify-content-start d-flex'>
                            <button onClick={() => { handleBackClicked() }}
                                className={`${darkMode ? "btn-dark border-3 btn-back-dark" : "btn-secondary border-3 border-dark btn-back-light"} border border-2 btn `}
                                style={{
                                    ...BackButtonstyle,

                                    "--bs-border-style": "solid",
                                    "--bs-border-color": "white",
                                    "--bs-btn-hover-border-color": "red",
                                    "--bs-btn-focus-border-color": "red",
                                    "--bs-btn-active-border-color": "red",
                                }}
                            >
                                Back
                            </button>
                        </div>
                       
                    </div>

                    <div className="TrainCont">
                        <h3 className="OllText">Labs</h3>
                        <h3 className='AlgText'> OLL 52</h3>

        
                    </div>
                                {//${darkMode ? "btn-dark border-3 btn-back-dark" : "btn-secondary border-3 border-dark btn-back-light"} border border-2 btn }}
}
                    <div className={`LabsGridCont`}>
                        {/* <div className="LabsCell">
                        {!recAnswered && 
                        
                        dbOllCaseSet && oll && <BarPersevationOverlay
                            oll={oll}
                            pll={""}
                            permIndex={0}
                            cpEasyWanted={false}
                            cpSameOppWanted={!cpSameOpp}
                            barMovementWanted={false}
                            cubeSize={cubeSize}
                            setCubeSize={setCubeSize}
                            cubeSizeFixed={true}
                            />
                        }
                        </div> */}
                        
                        {/* <LabsCell cubeSize={cubeSize} setCubeSize={setCubeSize} oll={oll} LastSlotAlgs={LastSlotAlgs}></LabsCell> */}
                        {/* <div className="LabsCell">
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
                                                            >Group 1</button> }
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
                                                            >Group 1</button> }
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
                                                        </div> }

                                                  
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
                                                        {/* <div className="dropdown-menu LabsOLLMenu"> }

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
                                                            >Group 1</button> }
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
                                                    
                                                        <div className="d-flex" alignItems="center">
                                                             <label style={{color:"white"}} for="LastSlotAlg">Last Slot Alg:</label>
                                                              <input name="LastSlotAlg" className="LastSlotSolveInput"></input>
                                                        </div>
                                                       
                                                        <input className="LastSlotCustomInput"></input>
                                                        <input className="LastSlotCustomInput"></input>
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
                            {!recAnswered && 
                        
                        
                            !recAnswered && dbOllCaseSet && oll && <BarPersevationOverlay
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
                        </div> */}

                <Labs2CellGrid cubeSize={cubeSize} setCubeSize={setCubeSize} oll={oll} LastSlotAlgs={LastSlotAlgs}></Labs2CellGrid>

                <Labs4CellLastSlotGrid cubeSize={cubeSize} setCubeSize={setCubeSize} oll={oll} LastSlotAlgs={LastSlotAlgs}> </Labs4CellLastSlotGrid>
                <Labs4CellPLLGrid cubeSize={cubeSize} setCubeSize={setCubeSize} oll={oll} LastSlotAlgs={LastSlotAlgs}> </Labs4CellPLLGrid>
                
                </div>
                

                <div className="AddLabsCellsCont">
            
                    <button  className={`LabsGroupButton ${darkMode ? "btn-dark border-3 btn-back-dark" : "btn-secondary border-3 border-dark btn-back-light"} border border-2 btn `}
                                   
                style={{
                
                    ...ContinueButtonstyle,

                    "--bs-border-style": "solid",
                    "--bs-border-color": "white",
                    "--bs-btn-hover-border-color": "red",
                    "--bs-btn-focus-border-color": "red",
                    "--bs-btn-active-border-color": "red",
                
                                        }}
                                        >Add 4 LastSlotCells</button>
                                <button  className={`LabsGroupButton ${darkMode ? "btn-dark border-3 btn-back-dark" : "btn-secondary border-3 border-dark btn-back-light"} border border-2 btn `}
                
                style={{
                
                    ...ContinueButtonstyle,

                    "--bs-border-style": "solid",
                    "--bs-border-color": "white",
                    "--bs-btn-hover-border-color": "red",
                    "--bs-btn-focus-border-color": "red",
                    "--bs-btn-active-border-color": "red",
                
                                        }}
                                        >Add 2 GridCells</button>
                                        <button  className={`LabsGroupButton ${darkMode ? "btn-dark border-3 btn-back-dark" : "btn-secondary border-3 border-dark btn-back-light"} border border-2 btn `}
                
                style={{
                
                    ...ContinueButtonstyle,

                    "--bs-border-style": "solid",
                    "--bs-border-color": "white",
                    "--bs-btn-hover-border-color": "red",
                    "--bs-btn-focus-border-color": "red",
                    "--bs-btn-active-border-color": "red",
                
                                        }}
                                        >Add 4 PLLCells</button>

                </div>
                
                </div>
                
            </div>

     </>
}
