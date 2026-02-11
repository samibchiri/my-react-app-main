import React, { useContext, useState } from "react"; // removed 'use'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import CaseImage from "../../components/Oll/cubing/cubeImage.jsx";

import TestPage from '../TestPage/TestPage.jsx';
import CornerPermutationPage from '../CpPage/CpPage.jsx';
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

import { ThemeContext } from '../../DarkThemeContext.jsx';
import ShowAlgCard from "../TrainSelectPage/cardPopUp.jsx";

import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions.jsx";

export default function MyAlgsPage() {

    const { darkMode } = useContext(ThemeContext)
    const [caseClicked, setCaseClicked] = useState(false)
    const [buttonClicked, setButtonClicked] = useState(false)
    const [cpClicked, setCpClicked] = useState(false)
    const [barClicked, setBarClicked] = useState(false)
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


    const tableCellDark = {
        backgroundColor: "#ffffff"
    }

    const tableCellLight = {
        backgroundColor: "#000000"

    }

    const [selectedCaseSet, setSelectedCaseSet] = useState(null)

    let AllCases = [cpllCaseSet, eollCaseSet, epllCaseSet, f2lCaseSet, ocllCaseSet, ollCaseSet, pllCaseSet]

    let dCrossShown = true

    const { xs } = useWindowDimensions();
    const cubeImageSize = xs ? "100" : "120";



    return <>

        <div style={{ height: "50px", alignItems: "center" }} className='col p-0 justify-content-start d-flex'>
            <button
                onClick={() => { handleBackClicked()}}
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
    </>
}