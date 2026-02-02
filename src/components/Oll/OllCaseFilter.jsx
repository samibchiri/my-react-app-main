import CaseImage from "./cubing/cubeImage.jsx";
import { ThemeContext } from '../../DarkThemeContext.jsx';
import React, { useMemo, useContext,useRef, useEffect, useState, useLayoutEffect } from "react";

export default function OllCaseFilter({groupSelected,setGroupSelected,arrowOllSet,ollSelectList,setOllSelectList,caseDetails}) {


    const BackButtonstyle={
        width: "75px",
        height: "40px",
        alignItems:"center",
        fontWeight:"bold",
        borderWidth:"2px",

      }

    const {darkMode}= useContext(ThemeContext)

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
        arrowOllSet[groupSelected].map((oll,i)=>{
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


