
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
import LabsCell, {AddLabsCell,CombinedAddRemoveLabsCell} from "./LabsCell.jsx";

import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions.jsx";


export function Labs2CellGrid({startCountNumber,cells,setCells,cubeSize,setCubeSize,unlinkable,oll, LastSlotAlgs,shortGroupTable}){
    
    console.log("ShortTable0",shortGroupTable)
    
    const { darkMode } = useContext(ThemeContext)
    
    return (
        
        <div className="Labs2CellGridCont">

             <CombinedAddRemoveLabsCell cellNumber={startCountNumber+0} cells={cells} setCells={setCells} unlinkable={unlinkable} linkedWith={[]} cubeSize={cubeSize} setCubeSize={setCubeSize} oll={oll} LastSlotAlgs={LastSlotAlgs} shortGroupTable={shortGroupTable}></CombinedAddRemoveLabsCell>

            <CombinedAddRemoveLabsCell cellNumber={startCountNumber+1} cells={cells} setCells={setCells} unlinkable={unlinkable} linkedWith={[]} cubeSize={cubeSize} setCubeSize={setCubeSize} oll={oll} LastSlotAlgs={LastSlotAlgs} shortGroupTable={shortGroupTable}></CombinedAddRemoveLabsCell>
            
 
        </div>
    )
}

export default Labs2CellGrid




export function Labs4CellLastSlotGrid({startCountNumber,cells,setCells,unlinkable,cubeSize,setCubeSize,oll, LastSlotAlgs, shortGroupTable}){
    
    console.log("ShortTable1",shortGroupTable)

    const { darkMode } = useContext(ThemeContext)

    let linkedWith= [[startCountNumber],["LastSlot"]]
    return (
        <>
        <div className="Labs4CellGridCont">

            <h2 style={{fontWeight:"600", marginBottom:"20px"}}> Last Slot Grid</h2>

        
        <div className="Labs4CellGrid">

            <CombinedAddRemoveLabsCell cellNumber={startCountNumber+0} cells={cells} setCells={setCells} unlinkable={unlinkable} linkedWith={linkedWith} cubeSize={cubeSize} setCubeSize={setCubeSize} oll={oll} LastSlotAlgs={LastSlotAlgs} shortGroupTable={shortGroupTable}></CombinedAddRemoveLabsCell>

            <CombinedAddRemoveLabsCell cellNumber={startCountNumber+1} cells={cells} setCells={setCells} unlinkable={unlinkable} linkedWith={linkedWith} cubeSize={cubeSize} setCubeSize={setCubeSize} oll={oll} LastSlotAlgs={LastSlotAlgs} shortGroupTable={shortGroupTable}></CombinedAddRemoveLabsCell>

            <CombinedAddRemoveLabsCell cellNumber={startCountNumber+2} cells={cells} setCells={setCells} unlinkable={unlinkable} linkedWith={linkedWith} cubeSize={cubeSize} setCubeSize={setCubeSize} oll={oll} LastSlotAlgs={LastSlotAlgs} shortGroupTable={shortGroupTable}></CombinedAddRemoveLabsCell>

            <CombinedAddRemoveLabsCell cellNumber={startCountNumber+3} cells={cells} setCells={setCells} unlinkable={unlinkable} linkedWith={linkedWith} cubeSize={cubeSize} setCubeSize={setCubeSize} oll={oll} LastSlotAlgs={LastSlotAlgs} shortGroupTable={shortGroupTable}></CombinedAddRemoveLabsCell>
        
            <CombinedAddRemoveLabsCell cellNumber={startCountNumber+4} cells={cells} setCells={setCells} unlinkable={unlinkable} linkedWith={linkedWith} cubeSize={cubeSize} setCubeSize={setCubeSize} oll={oll} LastSlotAlgs={LastSlotAlgs} shortGroupTable={shortGroupTable}></CombinedAddRemoveLabsCell>

            <CombinedAddRemoveLabsCell cellNumber={startCountNumber+5} cells={cells} setCells={setCells} unlinkable={unlinkable} linkedWith={linkedWith} cubeSize={cubeSize} setCubeSize={setCubeSize} oll={oll} LastSlotAlgs={LastSlotAlgs} shortGroupTable={shortGroupTable}></CombinedAddRemoveLabsCell>

        </div>
        </div>
        </>
    )
}

export function Labs4CellOLLGrid({startCountNumber,cells,setCells,unlinkable,cubeSize,setCubeSize,oll, LastSlotAlgs, shortGroupTable}){
    
    console.log("ShortTable2",shortGroupTable)
    let linkedWith=[]

    return (
        <>
        <div className="Labs4CellGridCont">

            <h2 style={{fontWeight:"600", marginBottom:"20px"}}> OLL Grid</h2>

        
        <div className="Labs4CellGrid">

            <CombinedAddRemoveLabsCell cellNumber={startCountNumber+0} cells={cells} setCells={setCells} unlinkable={unlinkable} linkedWith={linkedWith} cubeSize={cubeSize} setCubeSize={setCubeSize} oll={oll} LastSlotAlgs={LastSlotAlgs} shortGroupTable={shortGroupTable}></CombinedAddRemoveLabsCell>

            <CombinedAddRemoveLabsCell cellNumber={startCountNumber+1} cells={cells} setCells={setCells} unlinkable={unlinkable} linkedWith={linkedWith} cubeSize={cubeSize} setCubeSize={setCubeSize} oll={oll} LastSlotAlgs={LastSlotAlgs} shortGroupTable={shortGroupTable}></CombinedAddRemoveLabsCell>
            
            <CombinedAddRemoveLabsCell cellNumber={startCountNumber+2} cells={cells} setCells={setCells} unlinkable={unlinkable} linkedWith={linkedWith} cubeSize={cubeSize} setCubeSize={setCubeSize} oll={oll} LastSlotAlgs={LastSlotAlgs} shortGroupTable={shortGroupTable}></CombinedAddRemoveLabsCell>

            <CombinedAddRemoveLabsCell cellNumber={startCountNumber+3} cells={cells} setCells={setCells} unlinkable={unlinkable} linkedWith={linkedWith} cubeSize={cubeSize} setCubeSize={setCubeSize} oll={oll} LastSlotAlgs={LastSlotAlgs} shortGroupTable={shortGroupTable}></CombinedAddRemoveLabsCell>

        </div>
        </div>
        </>
    )
}

export function Labs4CellPLLGrid({startCountNumber,cells,setCells,unlinkable,cubeSize,setCubeSize,oll, LastSlotAlgs}){
    
    console.log("ShortTable3",shortGroupTable)
    let linkedWith=[]

    return (
        <>
        <div className="Labs4CellGridCont">

            <h2 style={{fontWeight:"600", marginBottom:"20px"}}> PLL Grid</h2>

        
        <div className="Labs4CellGrid">

            <CombinedAddRemoveLabsCell cellNumber={startCountNumber+0} cells={cells} setCells={setCells} unlinkable={unlinkable} linkedWith={linkedWith} cubeSize={cubeSize} setCubeSize={setCubeSize} oll={oll} LastSlotAlgs={LastSlotAlgs}></CombinedAddRemoveLabsCell>

            <CombinedAddRemoveLabsCell cellNumber={startCountNumber+1} cells={cells} setCells={setCells} unlinkable={unlinkable} linkedWith={linkedWith} cubeSize={cubeSize} setCubeSize={setCubeSize} oll={oll} LastSlotAlgs={LastSlotAlgs}></CombinedAddRemoveLabsCell>
            
            <CombinedAddRemoveLabsCell cellNumber={startCountNumber+2} cells={cells} setCells={setCells} unlinkable={unlinkable} linkedWith={linkedWith} cubeSize={cubeSize} setCubeSize={setCubeSize} oll={oll} LastSlotAlgs={LastSlotAlgs}></CombinedAddRemoveLabsCell>

            <CombinedAddRemoveLabsCell cellNumber={startCountNumber+3} cells={cells} setCells={setCells} unlinkable={unlinkable} linkedWith={linkedWith} cubeSize={cubeSize} setCubeSize={setCubeSize} oll={oll} LastSlotAlgs={LastSlotAlgs}></CombinedAddRemoveLabsCell>

        </div>
        </div>
        </>
    )
}