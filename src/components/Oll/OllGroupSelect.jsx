import { useNavigate } from "react-router-dom";
import CaseImage from "./cubing/cubeImage.jsx";
import { ThemeContext } from '../../DarkThemeContext.jsx';
import React, { useMemo, useContext,useRef, useEffect, useState, useLayoutEffect } from "react";
import { db } from '../../data/db.js';

import { useLiveQuery } from "dexie-react-hooks";

export default function OllGroupSelector({arrowOllSet, onSelectGroup, caseDetails }) {
  
    const navigate = useNavigate();
    const groupTable = {
  0: "Cross",
  1: "Dot",
  2: "T Shape",
  3: "C Shape",
  4: "I Shape",
  5: "P Shape",
  6: "W Shape",
  7: "Small L Shape",
  8: "Small Lightning Bolt",
  9: "Big Lightning Bolt",
  10: "Square Shape",
  11: "Fish Shape",
  12: "Knight Move Shape",
  13: "Awkward Shape",
  14: "Corners Oriented"
}

    const {darkMode}= useContext(ThemeContext)
    const BackButtonstyle={
        width: "75px",
        height: "40px",
        alignItems:"center",
        fontWeight:"bold",
        borderWidth:"2px",

      }

          const allOlls = useLiveQuery(() => db.olls.toArray(), []);
          const ollGroups = useMemo(() => {
        if (!allOlls) return [];
      
        // create empty arrays for each group index
        const groups = Array.from({ length: Object.keys(groupTable).length }, () => []);
      
        allOlls.forEach(oll => {
          const groupIndex = Number(
            Object.keys(groupTable).find(
              key => groupTable[key] === oll.group
            )
          );
      
          if (!isNaN(groupIndex)) {
            groups[groupIndex].push(oll);
          }
        });
      
        return groups;
      }, [allOlls]);
      
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
      
        {ollGroups.map((group, i) => (
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
