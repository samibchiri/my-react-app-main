
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
import Labs2CellGrid, {Labs4CellLastSlotGrid, Labs4CellOLLGrid, Labs4CellPLLGrid} from "./LabsGrids.jsx";


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

    let T_Perm= "R U R' U' R' F R2 U' R' U' R U R' F' "

    const shortGroupTable = {
  0: "Cross",
  1: "Dot",
  2: "T Shape",
  3: "C Shape",
  4: "I Shape",
  5: "P Shape",
  6: "W Shape",
  7: "Small L Shape",
  8: "Small Bolt",
  9: "Big Bolt",
  10: "Square Shape",
  11: "Fish Shape",
  12: "Knight Shape",
  13: "Awkward Shape",
  14: "Corners Oriented"
}

    const [cells, setCells] = useState([
         {
        id: "cell-0",
        cellNumber: 0,
        ollRecSetting: "",
        lastSlotAlgSetup: "",
        preOLLAUFSetup: "",
        ollAlgSetupNumber: "",
        ollAlgNumber:"",
        prePLLAUFSetup: "",
        pllAlgSetup: ``,
        postPLLAUFSetup: "",
        lastSlotAlgSolve:"",
        OLLAlgSolve:"",
        PLLAlgSolve:"",
        lastSlotGridNumber:"",
        PLLGridNumber:"",
        linkedCell: [1,"LastSlot"],
        hidden: false
    },
    {
        id: "cell-1",
        cellNumber: 1,
        ollRecSetting: "",
        lastSlotAlgSetup: "RU2R'",
        preOLLAUFSetup: "U",
        ollAlgSetupNumber: 27,
        ollAlgNumber:0,
        prePLLAUFSetup: "",
        pllAlgSetup: "",
        postPLLAUFSetup: "",
        lastSlotAlgSolve:"U' R U' R'",
        OLLAlgSolve:"U' R U2 R2 U' R2 U' R2 U2 R",
        PLLAlgSolve:"U R' U R' U' R3 U' R' U R U R2",
        lastSlotGridNumber:"",
        PLLGridNumber:"",
        linkedCell: [1,"LastSlot"],
        hidden: false
    },
    {
        id: "cell-2",
        cellNumber: 2,
        ollRecSetting: "",
        lastSlotAlgSetup: "",
        preOLLAUFSetup: "",
        ollAlgSetupNumber: "",
        ollAlgNumber:"",
        prePLLAUFSetup: "",
        pllAlgSetup: "",
        postPLLAUFSetup: "",
        lastSlotAlgSolve:"",
        OLLAlgSolve:"",
        PLLAlgSolve:"",
        lastSlotGridNumber:"",
        PLLGridNumber:"",
        linkedCell: [1,"LastSlot"],
        hidden: false
    },
    {
        id: "cell-3",
        cellNumber: 3,
        ollRecSetting: "",
        lastSlotAlgSetup: "R U2 R'",
        preOLLAUFSetup: "",
        ollAlgSetupNumber: "",
        ollAlgNumber:"",
        prePLLAUFSetup: "",
        pllAlgSetup: "",
        postPLLAUFSetup: "",
        lastSlotAlgSolve:"",
        OLLAlgSolve:"",
        PLLAlgSolve:"",
        lastSlotGridNumber:"",
        PLLGridNumber:"",
        linkedCell: [1,"LastSlot"],
        hidden: false
    },
    {
        id: "cell-4",
        cellNumber: 4,
        ollRecSetting: "",
        lastSlotAlgSetup: "",
        preOLLAUFSetup: "",
        ollAlgSetupNumber: "",
        ollAlgNumber:"",
        prePLLAUFSetup: "",
        pllAlgSetup: "",
        postPLLAUFSetup: "",
        lastSlotAlgSolve:"",
        OLLAlgSolve:"",
        PLLAlgSolve:"",
        lastSlotGridNumber:"",
        PLLGridNumber:"",
        linkedCell: [1,"LastSlot"],
        hidden: false
    },
    {
        id: "cell-5",
        cellNumber: 5,
        ollRecSetting: "",
        lastSlotAlgSetup: "",
        preOLLAUFSetup: "",
        ollAlgSetupNumber: "",
        ollAlgNumber:"",
        prePLLAUFSetup: "",
        pllAlgSetup: "",
        postPLLAUFSetup: "",
        lastSlotAlgSolve:"",
        OLLAlgSolve:"",
        PLLAlgSolve:"",
        lastSlotGridNumber:"",
        PLLGridNumber:"",
        linkedCell: [1,"LastSlot"],
        hidden: false
    },
    {
        id: "cell-6",
        cellNumber: 6,
        ollRecSetting: "",
        lastSlotAlgSetup: "",
        preOLLAUFSetup: "",
        ollAlgSetupNumber: "",
        ollAlgNumber:"",
        prePLLAUFSetup: "",
        pllAlgSetup: "",
        postPLLAUFSetup: "",
        lastSlotAlgSolve:"",
        OLLAlgSolve:"",
        PLLAlgSolve:"",
        lastSlotGridNumber:"",
        PLLGridNumber:"",
        linkedCell: [1,"LastSlot"],
        hidden: false
    },
    {
        id: "cell-2",
        cellNumber: 2,
        ollRecSetting: "",
        lastSlotAlgSetup: "",
        preOLLAUFSetup: "",
        ollAlgSetupNumber: "",
        ollAlgNumber:"",
        prePLLAUFSetup: "",
        pllAlgSetup: "",
        postPLLAUFSetup: "",
        lastSlotAlgSolve:"",
        OLLAlgSolve:"",
        PLLAlgSolve:"",
        lastSlotGridNumber:"",
        PLLGridNumber:"",
        linkedCell: [1,"LastSlot"],
        hidden: false
    },
    {
        id: "cell-7",
        cellNumber: 7,
        ollRecSetting: "",
        lastSlotAlgSetup: "",
        preOLLAUFSetup: "",
        ollAlgSetupNumber: "",
        ollAlgNumber:"",
        prePLLAUFSetup: "",
        pllAlgSetup: "",
        postPLLAUFSetup: "",
        lastSlotAlgSolve:"",
        OLLAlgSolve:"",
        PLLAlgSolve:"",
        lastSlotGridNumber:"",
        PLLGridNumber:"",
        linkedCell: [1,"LastSlot"],
        hidden: false
    }
]);

    const [gridList,setGridList] = useState([["LastSlot",0],["2Grid",6],["PLL",8]])

    const [unlinkable, setUnlinkable] = useState([])


    let unlinkableList = []
    let prevCount=0
    useEffect(()=>{
        gridList.forEach((grid)=>{
        
        let startCountNumber= grid[1]
        if(grid[0]!="2Grid"){
            while(prevCount<startCountNumber){
            unlinkableList.push(prevCount)
            prevCount+=1
            }
        }
        prevCount=startCountNumber

        setUnlinkable(unlinkableList)
    })

    },[gridList])
    
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
    // let oll = dbOllCaseSet?dbOllCaseSet[0]:""
    // console.log("Oll",oll)
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
                    <div className={`LabsGridCont`}>
                    
                
                {gridList.map((item)=>{
                    if(item[0]=="LastSlot"){
                        return(
                            <Labs4CellLastSlotGrid startCountNumber={item[1]} cells={cells} setCells={setCells} unlinkable={unlinkable} cubeSize={cubeSize} setCubeSize={setCubeSize} LastSlotAlgs={LastSlotAlgs} shortGroupTable={shortGroupTable}> </Labs4CellLastSlotGrid>
                
                        )
                    }
                    if(item[0]=="2Grid"){
                        return(
                            <h2></h2>
                            // <Labs2CellGrid startCountNumber={item[1]} cells={cells} setCells={setCells} unlinkable={unlinkable} cubeSize={cubeSize} setCubeSize={setCubeSize}LastSlotAlgs={LastSlotAlgs} shortGroupTable={shortGroupTable}> </Labs2CellGrid>
                
                        )
                    }
                    if(item[0]=="PLL"){
                        return(
                            <h2></h2>
                            // <Labs4CellPLLGrid startCountNumber={item[1]} cells={cells} setCells={setCells} unlinkable={unlinkable} cubeSize={cubeSize} setCubeSize={setCubeSize} LastSlotAlgs={LastSlotAlgs} shortGroupTable={shortGroupTable}> </Labs4CellPLLGrid>
                
                        )
                    }
                })}
                {/* <Labs2CellGrid startCountNumber={10} cells={cells} setCells={setCells} unlinkable={unlinkable} cubeSize={cubeSize} setCubeSize={setCubeSize} LastSlotAlgs={LastSlotAlgs} shortGroupTable={shortGroupTable}> </Labs2CellGrid> */}
                
                
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
                                        >Add 4 OLLCells</button>

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
