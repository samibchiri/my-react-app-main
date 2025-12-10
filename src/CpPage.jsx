
import arrowOllSet from "./data/arrowOllSet.js";
import { ThemeContext } from './DarkThemeContext.jsx';
import React, { use, useContext,useRef, useEffect, useState } from "react";
import "./index.css"
import { FaIcon } from './fontAwesome.js';
import CaseImage from "./cubing/cubeImage.jsx";
import ollCaseSet from "./data/ollCaseSet.js";

function CornerPermutationPage({algGroup,testedAlgs,setButtonClicked,setCaseClicked}){


console.log(algGroup)

const [groupSelected,setGroupSelected]=useState(0)
const [ollSelectList,setOllSelectList]=useState([])

const ScrambleVisualizerDetails={
    id: "oll",
    title: "OLL",
    subTitle: "Full OLL",
    view: "plan",
    stage:"cross",
    numCases: 57,
}
const {darkMode}= useContext(ThemeContext)

  const BackButtonstyle={
    width: "75px",
    height: "40px",
    alignItems:"center",
    fontWeight:"bold",
    borderWidth:"2px",
    
    

  }

function GetCentersPosition(cubeSize){
 
    const xCoords = [9.5, 39.5, 79.5, 119.5,149.5];
    const yCoords = [9.75, 39.75, 79.75, 119.75, 149.75];

    let Centers = [];

   
    for (let y of yCoords) {
        for (let x of xCoords) {
            Centers.push([x*(cubeSize/200), y*(cubeSize/200)]);
        }
    }

    console.log("CUBESIZe")
    console.log(cubeSize)
    console.log(Centers)
    
    return Centers

}

function Arrow(Center1,Center2,color,index){

    let Centers=GetCentersPosition()


let centerx=Centers[Center1][0]
let centery=Centers[Center1][1]

let centerx2=Centers[Center2][0]
let centery2=Centers[Center2][1]


let Correction=(centery2-centery)>0? 90:-90

let angle = Math.atan(-(centerx2 - centerx) / (centery2 - centery))*180/Math.PI;
if (centery==centery2){
    angle=0
    Correction=0
}
if (centerx>centerx2 && centery==centery2){
    [centerx, centerx2] = [centerx2, centerx];
    let difference=centerx2-centerx
    centerx-=difference
    centerx2-=difference
    // centery2-=2.5
    // centery-=1.5
    Correction+=180
}

angle+=Correction



centerx=Centers[Center1][0]
centery=Centers[Center1][1]
let centerpath=`M ${centerx},${centery} L ${centerx},${centery+2} L ${centerx+2},${centery+2} L ${centerx+2},${centery} L ${centerx},${centery} Z`

centerx=Centers[Center2][0]                                                               
centery=Centers[Center2][1]
let centerpath2=`M ${centerx},${centery} L ${centerx},${centery+2} L ${centerx+2},${centery+2} L ${centerx+2},${centery} L ${centerx},${centery} Z`



centerx=Centers[Center1][0]
centery=Centers[Center1][1]

centerx2=Centers[Center2][0]
centery2=Centers[Center2][1]
centerx=centerx2-((centerx-centerx2)**2+(centery-centery2)**2)**(1/2)                                                                                                                                                                                                                                                                                                                   //L 37,41 37,45 27,39 37,33 Z"
centery2+=1

let pathArrow2=`M ${centerx+3},${centery2-2} L ${centerx2-1},${centery2-2} L ${centerx2-1},${centery2-6} L ${centerx2+8},${centery2} L ${centerx2-1},${centery2+6} L ${centerx2-1},${centery2+2} L ${centerx+3},${centery2+2} L ${centerx+3},${centery2+2} L ${centerx+3},${centery2+6} L ${centerx-6},${centery2} L ${centerx+3},${centery2-6}  Z`

}

function getCenter1And2(oll,index,arrowNumber){
    let Center1
    let Center2
    if(index==0){
    Center1=oll.fullDiagCp[0][0][0+arrowNumber*3]
    Center2=oll.fullDiagCp[0][0][1+arrowNumber*3]
    }
    else if(index==5){
        Center1=oll.fullDiagCp[0][1][0+arrowNumber*3]
        Center2=oll.fullDiagCp[0][1][1+arrowNumber*3]
    }
    else if(index==1){
        Center1=oll.leftRightCp[0][0][0+arrowNumber*3]
        Center2=oll.leftRightCp[0][0][1+arrowNumber*3]
    }
    else if(index==2){
        Center1=oll.leftRightCp[0][1][0+arrowNumber*3]
        Center2=oll.leftRightCp[0][1][1+arrowNumber*3]
    }
    else if(index==3){
        Center1=oll.frontBackCp[0][0][0+arrowNumber*3]
        Center2=oll.frontBackCp[0][0][1+arrowNumber*3]
    }
    else if(index==4){
        Center1=oll.frontBackCp[0][1][0+arrowNumber*3]
        Center2=oll.frontBackCp[0][1][1+arrowNumber*3]
    }

    console.log("GetCenter12")
    console.log([Center1,Center2])
    return [Center1,Center2]
}

function getPath(oll,index,arrowNumber){
    
    console.log("getPath")
    let [Center1,Center2]=getCenter1And2(oll,index,arrowNumber);
    console.log(Center1,Center2)
    let Centers=GetCentersPosition(cubeSize)
    let centerx=Centers[Center1][0]
    let centery=Centers[Center1][1]

    let centerx2=Centers[Center2][0]
    let centery2=Centers[Center2][1]
    centerx=centerx2-((centerx-centerx2)**2+(centery-centery2)**2)**(1/2)                                                                                                                                                                                                                                                                                                                   //L 37,41 37,45 27,39 37,33 Z"
    centery2+=1

    // let pathArrow=`M ${centerx+3},${centery2-2} L ${centerx2-1},${centery2-2} L ${centerx2-1},${centery2-6} L ${centerx2+8},${centery2} L ${centerx2-1},${centery2+6} L ${centerx2-1},${centery2+2} L ${centerx+3},${centery2+2} L ${centerx+3},${centery2+2} L ${centerx+3},${centery2+6} L ${centerx-6},${centery2} L ${centerx+3},${centery2-6}  Z`
    let arrowWidth=cubeSize/200*2
  

    let pathArrow=`M ${centerx+3},${centery2-arrowWidth} L ${centerx2-1},${centery2-arrowWidth} L ${centerx2-1},${centery2-arrowWidth*3} L ${centerx2+arrowWidth*4},${centery2} L ${centerx2-1},${centery2+arrowWidth*3} L ${centerx2-1},${centery2+arrowWidth} L ${centerx+3},${centery2+arrowWidth} L ${centerx+3},${centery2+arrowWidth} L ${centerx+3},${centery2+arrowWidth*3} L ${centerx-arrowWidth*3},${centery2} L ${centerx+3},${centery2-arrowWidth*3}  Z`
    
    console.log(pathArrow)
    
    return pathArrow
}



function getRotation(oll,index,arrowNumber){ 

    console.log("getRotation")
    console.log(index)

    let [Center1,Center2]=getCenter1And2(oll,index,arrowNumber);
    
    console.log("GotCenters")
    console.log(Center1,Center2)

     
    let Centers=GetCentersPosition(cubeSize)

    let centerx=Centers[Center1][0]
    let centery=Centers[Center1][1]

    let centerx2=Centers[Center2][0]
    let centery2=Centers[Center2][1]


    let Correction=(centery2-centery)>0? 90:-90

    let angle = Math.atan(-(centerx2 - centerx) / (centery2 - centery))*180/Math.PI;
    if (centery==centery2){
        angle=0
        Correction=0
    }
    if (centerx>centerx2 && centery==centery2){
        [centerx, centerx2] = [centerx2, centerx];
        let difference=centerx2-centerx
        centerx-=difference
        centerx2-=difference
        // centery2-=2.5
        // centery-=1.5
        Correction+=180
    }

    angle+=Correction

    console.log(angle)
    return angle

}

function GetColor(oll,index,arrowNumber){
    
    let color
    let type
    console.log("Gettingcolorf")
    console.log(arrowNumber)
    //First select which set of arrows,
    //Then Select whether it is first or second arrow.
    //Then arrow properties
    if(index==0){
        type=oll.fullDiagCp[0][0][2+arrowNumber*3]
        console.log(type)
    }
    else if(index==1){
        type=oll.leftRightCp[0][0][2+arrowNumber*3]
        console.log(color)
    }
    else if(index==2){
        type=oll.leftRightCp[0][1][2+arrowNumber*3]
        console.log(color)
    }
    else if(index==3){
        type=oll.frontBackCp[0][0][2+arrowNumber*3]
        console.log(color)
    }
    else if(index==4){
        console.log(oll.frontBackCp)
        type=oll.frontBackCp[0][1][2+arrowNumber*3]
        console.log(color)
    }
    else if(index==5){
        type=oll.fullDiagCp[0][1][2+arrowNumber*3]
        console.log(color)
    }

    if(type=="opp"){
        color="red"
    }
    else if (type=="same"){
        color="cyan"
    }
    else{
        color="lime"
    }
    console.log(color)
    return color
}

function getArrowTipCoord(oll,index,arrowNumber,cubeSize){
    let [Center1,Center2]=getCenter1And2(oll,index,arrowNumber);
    console.log("Tip")
    console.log(Center2)
    let Centers= GetCentersPosition(cubeSize)
    let centerx2=Centers[Center2][0]
    let centery2=Centers[Center2][1]

    console.log([centerx2,centery2])
    //+1 for correction, don't know why
    return [centerx2+1,centery2]

}


let T_Perm="R U R' U' R' F R2 U' R' U' R U R' F'"
let Y_Perm="F R U' R' U' R U R' F' R U R' U' R' F R F'"

let CornerPermutations=["",T_Perm,"U2"+T_Perm   ,"U"+T_Perm,"U'"+T_Perm,Y_Perm]
let PermTable=[0,5,1,2,3,4]

let CpLocation=["Full","Diag","Left","Right","Front","Back"]

console.log(arrowOllSet)
const cubeSize=150

function getEasyRotation(Center1,Center2,cubeSize){

  
    let Centers=GetCentersPosition(cubeSize)

    let centerx=Centers[Center1][0]
    let centery=Centers[Center1][1]

    let centerx2=Centers[Center2][0]
    let centery2=Centers[Center2][1]


    let Correction=(centery2-centery)>0? 90:-90

    let angle = Math.atan(-(centerx2 - centerx) / (centery2 - centery))*180/Math.PI;
    if (centery==centery2){
        angle=0
        Correction=0
    }
    if (centerx>centerx2 && centery==centery2){
        [centerx, centerx2] = [centerx2, centerx];
        let difference=centerx2-centerx
        centerx-=difference
        centerx2-=difference
        // centery2-=2.5
        // centery-=1.5
        Correction+=180
    }

    angle+=Correction
    console.log("Easyangle")
    console.log(angle)
    return angle
}

function getEasyPath(Center1,Center2,cubeSize){
    let Centers=GetCentersPosition(cubeSize)
    console.log(Centers)
    console.log(Center1,Center2,cubeSize)
    let centerx=Centers[Center1][0]
    let centery=Centers[Center1][1]

    let centerx2=Centers[Center2][0]
    let centery2=Centers[Center2][1]

    centerx=centerx2-((centerx-centerx2)**2+(centery-centery2)**2)**(1/2)                                                                                                                                                                                                                                                                                                            //L 37,41 37,45 27,39 37,33 Z"
    centery2+=1

    // let pathArrow=`M ${centerx+3},${centery2-2} L ${centerx2-1},${centery2-2} L ${centerx2-1},${centery2-6} L ${centerx2+8},${centery2} L ${centerx2-1},${centery2+6} L ${centerx2-1},${centery2+2} L ${centerx+3},${centery2+2} L ${centerx+3},${centery2+2} L ${centerx+3},${centery2+6} L ${centerx-6},${centery2} L ${centerx+3},${centery2-6}  Z`

    let arrowWidth=cubeSize/200*2
  

    let pathArrow=`M ${centerx+3},${centery2-arrowWidth} L ${centerx2-1},${centery2-arrowWidth} L ${centerx2-1},${centery2-arrowWidth*3} L ${centerx2+arrowWidth*4},${centery2} L ${centerx2-1},${centery2+arrowWidth*3} L ${centerx2-1},${centery2+arrowWidth} L ${centerx+3},${centery2+arrowWidth} L ${centerx+3},${centery2+arrowWidth} L ${centerx+3},${centery2+arrowWidth*3} L ${centerx-arrowWidth*3},${centery2} L ${centerx+3},${centery2-arrowWidth*3}  Z`
    
    console.log(pathArrow)
    
    console.log("EASY")
    console.log(Center1,Center2)
    console.log(centerx,centery)
    return pathArrow
}

function getEasierRecognitionInfo(oll,index,arrowNumber,cubeSize){
    console.log(oll)
    let infoList=oll.easierRecognition[0]

    let SpecificPermInfo=infoList[index]

    let color

    if(SpecificPermInfo[2+3*arrowNumber]=="opp"){
        color="red"
    }
    else if((SpecificPermInfo[2+3*arrowNumber])=="same"){
        color="cyan"
    }
    else{
        color="lime"
    }

    
    let Center1=SpecificPermInfo[0+3*arrowNumber]
    let Center2=SpecificPermInfo[1+3*arrowNumber]


    let Centers= GetCentersPosition(cubeSize)
    let centerx2=Centers[Center2][0]
    let centery2=Centers[Center2][1]
    let arrowTipCoord=[centerx2,centery2]
    console.log("EasierRecTest")
    console.log(SpecificPermInfo)
    console.log(cubeSize)
    // console.log(oll,index,arrowNumber)
    // console.log(Center1,Center2,color)
   
    let rotation=getEasyRotation(Center1,Center2,cubeSize)
    let pathArrow=getEasyPath(Center1,Center2,cubeSize)

    console.log([rotation,pathArrow,color,arrowTipCoord])
    return [rotation,pathArrow,color,arrowTipCoord]



}


function getSameOppInfo(oll,index,arrowNumber,cubeSize){
    let infoList=[oll.SameOpp[0][0][0],oll.SameOpp[1][0][0],oll.SameOpp[1][0][1],oll.SameOpp[2][0][0],oll.SameOpp[2][0][1],oll.SameOpp[0][0][1]]
    console.log("Test")
    console.log(infoList)
    let SpecificPermInfo=infoList[index]

    let color

    if(SpecificPermInfo[2+3*arrowNumber]=="opp"){
        color="red"
    }
    else if((SpecificPermInfo[2+3*arrowNumber])=="same"){
        color="cyan"
    }
    else{
        color="lime"
    }

    
    let Center1=SpecificPermInfo[0+3*arrowNumber]
    let Center2=SpecificPermInfo[1+3*arrowNumber]


    let Centers= GetCentersPosition(cubeSize)
    let centerx2=Centers[Center2][0]
    let centery2=Centers[Center2][1]
    let arrowTipCoord=[centerx2,centery2]
    console.log("EasierRecTest")
    console.log(SpecificPermInfo)
    console.log(cubeSize)
    console.log(Centers,Center1,Center2)
    // console.log(oll,index,arrowNumber)
    // console.log(Center1,Center2,color)
   
    let rotation=getEasyRotation(Center1,Center2,cubeSize)
    let pathArrow=getEasyPath(Center1,Center2,cubeSize)

    console.log([rotation,pathArrow,color,arrowTipCoord])
    return [rotation,pathArrow,color,arrowTipCoord]



}

function AddItemToQuickSelect(i){

    console.log("AddThis",i)
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
// let FirstGroupCase=[]
// let Groups=[... new Set(ollCaseSet.cases.map(alg=>alg.group))]
// Groups.map(group=>{
// FirstGroupCase.push(ollCaseSet.cases.find(alg =>(
//     alg.group==group
// )))
// })
// console.log(Groups)
// console.log(FirstGroupCase)
useEffect(() => {
  console.time("OllGridsCont Render");
  // Force measurement after DOM paint
  requestAnimationFrame(() => {
    console.timeEnd("OllGridsCont Render");
  });
}, [groupSelected,ollSelectList]);

    return (
        <>
        {(groupSelected==null) &&(
            
            <div className="OllGroupOptionsGrid">
            {arrowOllSet.map((_,i)=> (
                <div className="OllGroupOptionsItem" onClick={()=>setGroupSelected(i)}>
                <h2 className="GroupItemName">{arrowOllSet[i][0].group}</h2>
                    
                    <CaseImage
                    size={80}
                    alg={arrowOllSet[i][0].algs}
                    caseSetDetails={ollCaseSet.details}
                    ></CaseImage>
                </div>
            ) )}
            </div>
            
        )}

    
         { (groupSelected!=null) && (
            <>
           
            <div className="OllQuickSelectCont"> 
                 <div style={{height:"50px", alignItems:"center",position:"absolute",top:"-35px",left:"0px", display:"inline-block"}} className='col p-0 justify-content-start '>
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
                        caseSetDetails={ollCaseSet.details}
                        ></CaseImage>
                   </div>
                    
                   </>
                   )
                })
            }
                 </div>
            </div>
            </>
        )}
            
            { (groupSelected!=null) && (
                <div className="OllGridsCont">
                    {
                arrowOllSet[groupSelected].map((oll,i)=>
                (ollSelectList.includes(oll.name.split(" ")[1]) ||ollSelectList.length==0) &&
                
                (
                    <>
                    
                    <div>
                    <h2>{oll.name}</h2>
                    
                    <div className="OllGrid">
                        
                        {CornerPermutations.map((_,j)=>
                        <div className="RecCont">  
                        <h2 className="OllCpLocation">{CpLocation[j]}</h2>
                        {/* <h2 className="OllCpLocation">{oll.algNumber?CpLocation[j] +" -> "+oll.barMovements[PermTable[j]][0]:CpLocation[j] }</h2> */}
                        <div id="tempCont" style={{position:"relative",height:`${cubeSize*160/200}px`,width:`${cubeSize*160/200}`,marginBottom:"20px"}}>
                        <CaseImage
                            size={cubeSize}
                            //alg={""+scramble2.replace(/\s+/g, "")+"y2"}
                                alg={(oll.algs+CornerPermutations[PermTable[j]]).replace(/\s+/g, "")+"y2"}
                            caseSetDetails={ScrambleVisualizerDetails}
                            co="40"
                        ></CaseImage>

                        
                        <div className='CpRecOverlay' style={{height:`${cubeSize*160/200}px`,width:`${cubeSize*160/200}px`,marginTop:`${-20+cubeSize/10}px`}}>
                           
                            {
                               <>
                               
                                <svg style={{position:"absolute"}}id="GoodLine" width="100%" height="100%">
                                    <path
                                        d={getPath(oll,PermTable[j],0,cubeSize)}
                                        fill={`${GetColor(oll,PermTable[j],0)}`}
                                        stroke="rgba(0, 0, 0, 1)"
                                        strokeWidth="1"
                                        transform={`rotate(${getRotation(oll,PermTable[j],0)} ${getArrowTipCoord(oll,PermTable[j],0,cubeSize)[0]} ${getArrowTipCoord(oll,PermTable[j],0,cubeSize)[1]})`}
                                    />
                                </svg>
                                <svg style={{position:"absolute"}}id="GoodLine" width="100%" height="100%">
                                    <path
                                        d={getPath(oll,PermTable[j],1,cubeSize)}
                                        fill={`${GetColor(oll,PermTable[j],1)}`}
                                        stroke="rgba(0, 0, 0, 1)"
                                        strokeWidth="1"
                                        transform={`rotate(${getRotation(oll,PermTable[j],1,cubeSize)} ${getArrowTipCoord(oll,PermTable[j],1,cubeSize)[0]} ${getArrowTipCoord(oll,PermTable[j],1,cubeSize)[1]})`}
                                    />
                                </svg>
                                </>
                            
                        
                            }
                            
                        </div>
                        </div>
                        <div className='CpGridOverlay' style={{height:`${cubeSize*160/200}px`,width:`${cubeSize*160/200}px`,marginTop:`${-20+cubeSize/10}px`}}>
                            
                        </div>
                        </div>
                        )}
                    
                
                </div>
                </div>
                

                
                    <div>
                    <h2>{oll.name}</h2>
                    <div className="OllGrid">
                        
                        {CornerPermutations.map((_,j)=>
                        <div className="RecCont">  
                        <h2 className="OllCpLocation">{CpLocation[j]}</h2>
                        
                         <div id="tempCont" style={{position:"relative",height:`${cubeSize*160/200}px`,width:`${cubeSize*160/200}`,marginBottom:"20px"}}>
                       
                        <CaseImage
                            size={cubeSize}
                            //alg={""+scramble2.replace(/\s+/g, "")+"y2"}
                                alg={(oll.algs+CornerPermutations[PermTable[j]]).replace(/\s+/g, "")+"y2"}
                            caseSetDetails={ScrambleVisualizerDetails}
                            co="40"
                        ></CaseImage>
                        <div  className='CpRecOverlay' style={{height:`${cubeSize*160/200}px`,width:`${cubeSize*160/200}px`,marginTop:`${-20+cubeSize/10}px`}}>
                           
                            {
                               <>
                               
                                <svg style={{position:"absolute"}}id="GoodLine" width="100%" height="100%">
                                    <path
                                        d={getSameOppInfo(oll,PermTable[j],0,cubeSize)[1]}
                                        fill={`${getSameOppInfo(oll,PermTable[j],0,cubeSize)[2]}`}
                                        stroke="rgba(0, 0, 0, 1)"
                                        strokeWidth="1"
                                        transform={`rotate(${getSameOppInfo(oll,PermTable[j],0,cubeSize)[0]} ${getSameOppInfo(oll,PermTable[j],0,cubeSize)[3][0]} ${getSameOppInfo(oll,PermTable[j],0,cubeSize)[3][1]})`}
                                    />
                                </svg>
                                <svg style={{position:"absolute"}}id="GoodLine" width="100%" height="100%">
                                    <path
                                        d={getSameOppInfo(oll,PermTable[j],1,cubeSize)[1]}
                                        fill={`${getSameOppInfo(oll,PermTable[j],1,cubeSize)[2]}`}
                                        stroke="rgba(0, 0, 0, 1)"
                                        strokeWidth="1"
                                        transform={`rotate(${getSameOppInfo(oll,PermTable[j],1,cubeSize)[0]} ${getSameOppInfo(oll,PermTable[j],1,cubeSize)[3][0]} ${getSameOppInfo(oll,PermTable[j],1,cubeSize)[3][1]})`}
                                    />
                                </svg>
                                </>
                            
                        
                            }
                            
                        </div>
                        </div>
                        <div className='CpGridOverlay' style={{height:`${cubeSize*160/200}px`,width:`${cubeSize*160/200}px`,marginTop:`${-20+cubeSize/10}px`}}>
                            
                        </div>
                        </div>
                        )}
                    
                
                </div>
                </div>
                </>
                )
            )
        }
        </div>
        )
            }
        
                    




        {/* { (groupSelected!=null) && (
                arrowOllSet[groupSelected].map((oll,i)=>
                (
                    <div>
                    <h2>{oll.name}</h2>
                    <div className="OllGrid">
                        
                        {CornerPermutations.map((_,j)=>
                        <div className="RecCont">  
                        <h2 className="OllCpLocation">{CpLocation[j]}</h2>
                        
                        <CaseImage
                            size={cubeSize}
                            //alg={""+scramble2.replace(/\s+/g, "")+"y2"}
                                alg={(oll.algs+CornerPermutations[PermTable[j]]).replace(/\s+/g, "")+"y2"}
                            caseSetDetails={ScrambleVisualizerDetails}
                            co="40"
                        ></CaseImage>
                        <div  className='CpRecOverlay' style={{height:`${cubeSize*160/200}px`,width:`${cubeSize*160/200}px`,marginTop:`${45+cubeSize/10}px`}}>
                           
                            {
                               <>
                               
                                <svg style={{position:"absolute"}}id="GoodLine" width="100%" height="100%">
                                    <path
                                        d={getEasierRecognitionInfo(oll,PermTable[j],0,cubeSize)[1]}
                                        fill={`${getEasierRecognitionInfo(oll,PermTable[j],0,cubeSize)[2]}`}
                                        stroke="rgba(0, 0, 0, 1)"
                                        strokeWidth="1"
                                        transform={`rotate(${getEasierRecognitionInfo(oll,PermTable[j],0,cubeSize)[0]} ${getEasierRecognitionInfo(oll,PermTable[j],0,cubeSize)[3][0]} ${getEasierRecognitionInfo(oll,PermTable[j],0,cubeSize)[3][1]})`}
                                    />
                                </svg>
                                <svg style={{position:"absolute"}}id="GoodLine" width="100%" height="100%">
                                    <path
                                        d={getEasierRecognitionInfo(oll,PermTable[j],1,cubeSize)[1]}
                                        fill={`${getEasierRecognitionInfo(oll,PermTable[j],1,cubeSize)[2]}`}
                                        stroke="rgba(0, 0, 0, 1)"
                                        strokeWidth="1"
                                        transform={`rotate(${getEasierRecognitionInfo(oll,PermTable[j],1,cubeSize)[0]} ${getEasierRecognitionInfo(oll,PermTable[j],1,cubeSize)[3][0]} ${getEasierRecognitionInfo(oll,PermTable[j],1,cubeSize)[3][1]})`}
                                    />
                                </svg>
                                </>
                            
                        
                            }
                            
                        </div>
                        <div className='CpGridOverlay' style={{height:`${cubeSize*160/200}px`,width:`${cubeSize*160/200}px`,marginTop:`${45+cubeSize/10}px`}}>
                            
                        </div>
                        </div>
                        )}
                    
                
                </div>
                </div>
                )
            )
        )
            } */}
{/* 
            { (groupSelected!=null) && (
                arrowOllSet[groupSelected].map((oll,i)=>
                (i==0) &&(
                    <div>
                    <h2>{oll.name}</h2>
                    <div className="OllGrid">
                        
                        {CornerPermutations.map((_,j)=>
                        <div className="RecCont">  
                        <h2 className="OllCpLocation">{CpLocation[j]}</h2>
                        
                        <CaseImage
                            size={cubeSize}
                            //alg={""+scramble2.replace(/\s+/g, "")+"y2"}
                                alg={(oll.algs+CornerPermutations[PermTable[j]]).replace(/\s+/g, "")+"y2"}
                            caseSetDetails={ScrambleVisualizerDetails}
                            co="40"
                        ></CaseImage>
                        <div  className='CpRecOverlay' style={{height:`${cubeSize*160/200}px`,width:`${cubeSize*160/200}px`,marginTop:`${45+cubeSize/10}px`}}>
                           
                            {
                               <>
                               
                                <svg style={{position:"absolute"}}id="GoodLine" width="100%" height="100%">
                                    <path
                                        d={getSameOppInfo(oll,PermTable[j],0,cubeSize)[1]}
                                        fill={`${getSameOppInfo(oll,PermTable[j],0,cubeSize)[2]}`}
                                        stroke="rgba(0, 0, 0, 1)"
                                        strokeWidth="1"
                                        transform={`rotate(${getSameOppInfo(oll,PermTable[j],0,cubeSize)[0]} ${getSameOppInfo(oll,PermTable[j],0,cubeSize)[3][0]} ${getSameOppInfo(oll,PermTable[j],0,cubeSize)[3][1]})`}
                                    />
                                </svg>
                                <svg style={{position:"absolute"}}id="GoodLine" width="100%" height="100%">
                                    <path
                                        d={getSameOppInfo(oll,PermTable[j],1,cubeSize)[1]}
                                        fill={`${getSameOppInfo(oll,PermTable[j],1,cubeSize)[2]}`}
                                        stroke="rgba(0, 0, 0, 1)"
                                        strokeWidth="1"
                                        transform={`rotate(${getSameOppInfo(oll,PermTable[j],1,cubeSize)[0]} ${getSameOppInfo(oll,PermTable[j],1,cubeSize)[3][0]} ${getSameOppInfo(oll,PermTable[j],1,cubeSize)[3][1]})`}
                                    />
                                </svg>
                                </>
                            
                        
                            }
                            
                        </div>
                        <div className='CpGridOverlay' style={{height:`${cubeSize*160/200}px`,width:`${cubeSize*160/200}px`,marginTop:`${45+cubeSize/10}px`}}>
                            
                        </div>
                        </div>
                        )}
                    
                
                </div>
                </div>
                )
            )
        )
            } */}
                
               
        
        
        {/* <CaseImage
            size={200}
            //alg={""+scramble2.replace(/\s+/g, "")+"y2"}
                alg={arrowOllSet[0].algs}
            caseSetDetails={ScrambleVisualizerDetails}
            co="40"
        ></CaseImage> */}
        </>
    )
}

export default CornerPermutationPage