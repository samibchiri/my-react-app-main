import { useNavigate } from "react-router-dom";
import CaseImage from "./cubing/cubeImage.jsx";
import { ThemeContext } from '../../DarkThemeContext.jsx';
import React, { useMemo, useContext,useRef, useEffect, useState, useLayoutEffect } from "react";

export default function OllGroupSelector({arrowOllSet, onSelectGroup, caseDetails }) {
  
    const navigate = useNavigate();

    const {darkMode}= useContext(ThemeContext)
    const BackButtonstyle={
        width: "75px",
        height: "40px",
        alignItems:"center",
        fontWeight:"bold",
        borderWidth:"2px",

      }

    console.log("Here",BackButtonstyle,darkMode)
    return (
      <>
       
      <div className="OllGroupOptionsGrid">
         <div style={{height:"50px", alignItems:"center",position:"absolute",top:"100px",left:"50px", display:"inline-block"}} className='col p-0 justify-content-start '>
          <button onClick={() => navigate("/train")}
          className={`${darkMode ? "btn-dark border-3 btn-back-dark" : "btn-secondary border-3 border-dark btn-back-light"} border border-2 btn `}
          style={{
              ...BackButtonstyle,
              
              "--bs-border-style": "solid",
              "--bs-border-color": "white",
              
          }}
          >
          Back
          </button>
      </div>
      
        {arrowOllSet.map((group, i) => (
          <div
            key={i}
            className="OllGroupOptionsItem"
            onClick={() => onSelectGroup(i)}
          >
            <h2 className="GroupItemName">{group[0].group}</h2>

            <CaseImage
              size={80}
              alg={group[0].algs}
              caseSetDetails={caseDetails}
            />
          </div>
        ))}
      </div>
    </>
  );
}
