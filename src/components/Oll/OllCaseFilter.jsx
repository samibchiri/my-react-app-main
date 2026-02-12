import CaseImage from "./cubing/cubeImage.jsx";
import { ThemeContext } from '../../context/DarkThemeContext.jsx';
import React, { useMemo, useContext,useRef, useEffect, useState, useLayoutEffect } from "react";

import { db } from '../../data/db.js';

import { useLiveQuery } from "dexie-react-hooks";

export default function OllCaseFilter({groupSelected,setGroupSelected,arrowOllSet,ollSelectList,setOllSelectList,caseDetails}) {


    const BackButtonstyle={
        width: "75px",
        height: "40px",
        alignItems:"center",
        fontWeight:"bold",
        borderWidth:"2px",

      }
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

    console.log("ollGroup",ollGroups)

    console.log("Herre",BackButtonstyle)
    if (groupSelected == null) {
        return null; // stop execution here
    }

    function AddItemToQuickSelect(i){

        if(ollSelectList.includes(i)
        ){
            setOllSelectList(prev =>prev.filter(item=>
            item!=i
        ))
            
        }
        else{
            setOllSelectList(prev=>[...prev,i])
        }
        
    }
    
  return (
    <>
    <div style={{height:"50px", alignItems:"center",position:"absolute",top:"100px",left:"50px", display:"inline-block"}} className='col p-0 justify-content-start '>
        <button
        onClick={() => {setGroupSelected(null), setOllSelectList([])}}
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
     <div className="OllQuickSelectCont"> 
            
    <div className="OllItemQuickSelect">{
        ollGroups[groupSelected]?.map((oll,i)=>{
            if(oll.algNumber!=0){
                return null
            }
                
            return (
            <>
            
            
            <div className={`OllQuickSelectItem ${ollSelectList.includes(oll.name.split(" ")[1]) ? "selected" : ""}`}  onClick={()=>AddItemToQuickSelect(oll.name.split(" ")[1])}>
                <CaseImage
                size={100}
                alg={oll.algs}
                caseSetDetails={caseDetails}
                ></CaseImage>
            </div>
            
            </>
            )
        })
    }
        </div>
    </div>
    </>
  );
}


