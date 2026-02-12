
import { ThemeContext } from './context/DarkThemeContext.jsx';
import React, { use, useContext,useRef, useEffect, useState } from "react";
import "./index.css"
import { FaIcon } from './fontAwesome.js';
import CaseImage from "./cubing/cubeImage.jsx";
import Stopwatch from './Stopwatch.jsx';
import { difference, get } from 'lodash';
import html2canvas from "html2canvas";
import { flushSync } from 'react-dom';



function CpPage({testedAlgs,setButtonClicked,setCaseClicked}){

const [pathArrowList, setPathArrowList] = useState([]);
const [angleList, setAngleList] = useState([]);
const [centerPathList, setCenterPathList] = useState([]);
const [centerPath2List, setCenterPath2List] = useState([]);
const [centerxList, setCenterxList] = useState([]);
const [centerx2List, setCenterx2List] = useState([]);
const [centeryList, setCenteryList] = useState([]);
const [centery2List, setCentery2List] = useState([]);
const [squaresColors, setSquaresColors] = useState([]);
const [arrowCombination,setArrowCombination]=useState([])
const [arrowColor, setArrowColor]=useState([])
const [scramble, setScramble] = useState();
const [arrowCombinationSorted,setArrowCombinationSorted]= useState(false)
const [arrowDone,setArrowDone]=useState(false)

const [tempArrowSet, setTempArrowSet] = useState(new Set());
const [possibleArrowCombination, setPossibleArrowCombination] = useState(new Set());
    let T_Perm="R U R' U' R' F R2 U' R' U' R U R' F'"
    let Y_Perm="F R U' R' U' R U R' F' R U R' U' R' F R F'"

    let CornerPermutations=["",T_Perm,T_Perm+"U2",T_Perm+"U",T_Perm+"U'",Y_Perm]
    
    const ScrambleVisualizerDetails={
    id: "oll",
    title: "OLL",
    subTitle: "Full OLL",
    view: "plan",
    stage:"cross",
    numCases: 57,
  }

  let pathArrow1="M 37,37 L 117,37 L 117,33 L 127,39 L 117,43 L 117,41 L 37,41 37,45 27,39 37,33 Z"

const xCoords = [9, 39, 79, 119,149];
const yCoords = [9.25, 39.25, 79.25, 119.25, 149.25];

let Centers = [];

for (let y of yCoords) {
  for (let x of xCoords) {
    Centers.push([x, y]);
  }
}




function Arrow(Center1,Center2,color){

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

  setPathArrowList(prev => [...prev, pathArrow2]);
  setAngleList(prev => [...prev, angle]);
  setCenterPathList(prev => [...prev, centerpath]);
  setCenterPath2List(prev => [...prev, centerpath2]);
  setCenterxList(prev => [...prev, centerx]);
  setCenterx2List(prev => [...prev, centerx2]);
  setCenteryList(prev => [...prev, centery]);
  setCentery2List(prev => [...prev, centery2])
  setArrowColor(prev => [...prev,color]);
}



function oneWayArrow(Center1,Center2){


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
if (centerx>centerx2){
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
centerx=centerx2-((centerx-centerx2)**2+(centery-centery2)**2)**(1/2)

centerx2-=0
let pathArrow2=`M ${centerx-5},${centery2} Q ${centerx-3},${centery2-2} ${centerx},${centery2-2} L ${centerx},${centery2-2} L ${centerx2-2},${centery2-2} L ${centerx2-2},${centery2-6} L ${centerx2+8},${centery2} L ${centerx2-2},${centery2+6.75} L ${centerx2-2},${centery2+3} L ${centerx},${centery2+3} Q ${centerx-2},${centery2+3} ${centerx-2},${centery2} Z`
return [pathArrow2,angle,centerpath,centerpath2,centerx,centerx2,centery,centery2]
}


// let newPathArrow2
// let newAngle
// let newCenterPath
// let newCenterPath2
// let newCenterx
// let newCenterx2
// let newCentery
// let newCentery2
// [newPathArrow2,newAngle,newCenterPath,newCenterPath2,newCenterx,newCenterx2,newCentery,newCentery2]=Arrow(Center1,Center2)
  







// pathArrowList=[...pathArrowList,newPathArrow2]
// angleList=[...angleList,newAngle]
// centerPathList=[...centerPathList,newCenterPath]
// centerPath2List=[...centerPath2List,newCenterPath2]
// centerxList=[...centerxList,newCenterx]
// centerx2List=[...centerx2List,newCenterx2]
// centeryList=[...centeryList,newCentery]
// centery2List=[...centery2List,newCentery2]
// console.log(centery2List)
// [newPathArrow2,newAngle,newCenterPath,newCenterPath2,newCenterx,newCenterx2,newCentery,newCentery2]=Arrow(Center2,Center1)
  
// pathArrowList=[...pathArrowList,newPathArrow2]
// angleList=[...angleList,newAngle]
// centerPathList=[...centerPathList,newCenterPath]
// centerPath2List=[...centerPath2List,newCenterPath2]
// centerxList=[...centerxList,newCenterx]
// centerx2List=[...centerx2List,newCenterx2]
// centeryList=[...centeryList,newCentery]
// centery2List=[...centery2List,newCentery2]

// console.log(centery2List)


// useEffect(() => {
//   //let [newPathArrow2, newAngle, newCenterPath, newCenterPath2, newCenterx, newCenterx2, newCentery, newCentery2] =
//   if (!scramble) return;

//   if (scrambleIndex.current >= CornerPermutations.length) return; // stop if done

//     setScramble("R U R' U R U2 R'"+CornerPermutations[scrambleIndex.current])
    
//     setPathArrowList([]);
//   setAngleList([]);
//   setCenterPathList([]);
//   setCenterPath2List([]);
//   setCenterxList([]);
//   setCenterx2List([]);
//   setCenteryList([]);
//   setCentery2List([]);
//   setArrowColor([]);

//     getSquareColors();
//     scrambleIndex.current += 1; // move to next scramble
// }, [arrowCombination]); // <-- empty dependency array ensures it runs only once

// 1️⃣ Initialize first scramble
let scrambleIndex=useRef(0)

useEffect(() => {
    setScramble("R U R' U R U2 R'" + CornerPermutations[scrambleIndex.current]);
}, []);

// 2️⃣ Whenever scramble changes, reset lists & read squares
useEffect(() => {
    console.log(`ScrambleIndex,${scrambleIndex.current}`)
    if (!scramble) return;

    setPathArrowList([]);
    setAngleList([]);
    setCenterPathList([]);
    setCenterPath2List([]);
    setCenterxList([]);
    setCenterx2List([]);
    setCenteryList([]);
    setCentery2List([]);
    setArrowColor([]);

    // give CaseImage time to render
     const timeout = setTimeout(() => {
    getSquareColors();
  }, 10000);

  return () => clearTimeout(timeout);
}, [scramble]);

// 3️⃣ When square colors are ready → generate arrows
useEffect(() => {
    if (squaresColors.length === 0) return;
      setTimeout(() => {
    getPossibleArrows();
  }, 100);
}, [squaresColors]);

// 4️⃣ After arrows are generated → go to next scramble
useEffect(() => {
    if (arrowCombination.length === 0) return;
//CornerPermutations.length
    if (scrambleIndex.current + 1 < CornerPermutations.length) {
        scrambleIndex.current += 1;
        setScramble("R U R' U R U2 R'" + CornerPermutations[scrambleIndex.current]);
    }
    if (scrambleIndex.current+1==CornerPermutations.length){
        setArrowDone(true)
    }
}, [arrowCombination]);

useEffect(()=>{
    if(arrowDone==true){
    arrowCombinationSort()
    if(arrowCombination.length==6){
        setArrowCombinationSorted(true)
    }
    }
},[arrowDone])


function arrowCombinationSort(){
    console.log(`ScrambleIndex,${scrambleIndex.current}`)
    console.log(arrowCombination)
     if(scrambleIndex.current===5 &&arrowCombination.length==6){
        console.log("Continue")
        
        let newArray=[]
        console.log(arrowCombination.length)
        for (let j=0;j<Math.min(arrowCombination.length,6);j++){
            console.log("Continue2")
            let partOfArray=arrowCombination[j]
            console.log(partOfArray)
            // let firstSmallerThanSecondPartOfArray = partOfArray
            // .map(([c1, c2, type, penalty]) => {
            //     if (c1 > c2) [c1, c2] = [c2, c1]; // ensure c1 < c2
            //     return [c1, c2, type, penalty];
            // })
            // .sort((a, b) => {
            //     if (a[0] !== b[0]) return a[0] - b[0]; // first element ascending
            //     return a[1] - b[1];                     // second element ascending
            // });

            // console.log(firstSmallerThanSecondPartOfArray);

            // console.log("PartSort")
            // console.log(firstSmallerThanSecondPartOfArray)
            // let sortedArray = [...firstSmallerThanSecondPartOfArray].sort((a, b) => {
            // if (a[3] !== b[3]) return a[3] - b[3]; // third element ascending
            // if (a[0] !== b[0]) return a[0] - b[0]; // second element ascending
            // return a[1] - b[1]; // first element ascending
            // });

            let sortedArray = partOfArray
            .map(([c1, c2, type, penalty]) => {
                if (c1 > c2) [c1, c2] = [c2, c1]; // ensure center1 < center2
                return [c1, c2, type, penalty];
            })
            .sort((a, b) => {
                if (a[3] !== b[3]) return a[3] - b[3]; // penalty ascending
                if (a[0] !== b[0]) return a[0] - b[0]; // center1 ascending
                return a[1] - b[1];                     // center2 ascending
            });


            newArray.push(sortedArray)
            
        }
        //console.log("FullSort")
        //console.log(newArray)
        setArrowCombination(newArray)
    }
}

useEffect(()=>{
    console.log("Doesnt go")
    console.log(arrowCombination)
    console.log(arrowCombination.length)
    if(arrowCombinationSorted==true){
    if (arrowCombination.length==6){//First Arrow Indices
        console.log(`ArrowCombinationLength is ${arrowCombination.length}`)
    
     for (let index1=0;index1<arrowCombination[0].length;index1++){
        
             for (let index2=0;index2<arrowCombination[0].length;index2++){//Second Arrow Indices
                let tempset=new Set()
                let prevcenter2a=null
                let prevcenter2b=null
                for( let index3=0;index3<arrowCombination.length;index3++){ //ScrambleCornerPermutation

                
                let center1a=arrowCombination[index3][index1][0]
                let center1b=arrowCombination[index3][index1][1]
                let center2a=arrowCombination[index3][index2][0]
                let center2b=arrowCombination[index3][index2][1]
                
                if(center1a>center1b){
                    [center1b,center1a]=[center1a,center1b]
                }
                if(center2a>center2b){
                    [center2b,center2a]=[center2a,center2b]
                }
                
                
                tempset.add(JSON.stringify([center1a,center1b,arrowCombination[index3][index1][2],center2a,center2b,center1a=arrowCombination[index3][index2][2]]))
                
            }
            
             
                console.log("Tempset")
             console.log(tempset)
             
             
                }
            }
        }
    }
},[arrowCombinationSorted])
    

useEffect(()=>{
    if (tempArrowSet.size === 6) {
    console.log("Found arrowCombination with 6 unique elements!");
    console.log(Array.from(tempArrowSet).map(JSON.parse));
  }

},[tempArrowSet])

// useEffect(() => {
//   if (squaresColors.length === 0) return;
//   getPossibleArrows();
// }, [squaresColors]);

// useEffect(()=>{
//     if(arrowCombination.length>0){
//         // console.log("Here?")
//         // console.log(arrowCombination)
//         // console.log(arrowCombination[arrowCombination.length-1])
//         let color
//         for (let index=0;index<arrowCombination[arrowCombination.length-1].length;index++){
//         if(arrowCombination[arrowCombination.length-1][index][2]=="same"){
//             color="rgba(0, 255, 21, 1)"
//         }
//         else if (arrowCombination[arrowCombination.length-1][index][2]=="opp"){
//             color="rgba(4, 0, 255, 1)"
//         }
//         else{
//             color="red"
//         }
//     }
//     }
   
// },[arrowCombination])



 const overlayRef = useRef(null);


     function getSquareColors(){
         const containerParent = overlayRef.current;
    let container= containerParent.querySelector("div")
    let containerSvg= container.querySelector("svg")
    let containerSvgSquaresInside= containerSvg.querySelectorAll("g")[1]
    let containerSvgSquaresInsideList= containerSvgSquaresInside.querySelectorAll("polygon")
    //console.log(containerSvgSquaresInsideList)
    
    let containerSvgSquaresOutside= containerSvg.querySelectorAll("g")[2]
     let containerSvgSquaresOutsideList= containerSvgSquaresOutside.querySelectorAll("polygon")
    
     let combinedSquaresList=[...containerSvgSquaresInsideList,...containerSvgSquaresOutsideList]
    combinedSquaresList=[...combinedSquaresList,...[0,0,0,0]]
     //console.log(combinedSquaresList)
    let Remapping = [
  [0,6],[1,7],[2,8],[3,11],[4,12],
  [5,13],[6,16],[7,17],[8,18],[9,19],
  [10,14],[11,9],[12,21],[13,22],[14,23],
  [15,5],[16,10],[17,15],[18,3],[19,2],
  [20,1],[21,24],[22,20],[23,4],[24,0]
];
    let newCombinedSquaresList=new Array(25).fill(0);
    //console.log(newCombinedSquaresList)
    combinedSquaresList.forEach((_,i)=>{
        newCombinedSquaresList[Remapping[i][1]]=combinedSquaresList[i]
    })
    //console.log(newCombinedSquaresList)
    let newSquaresColors=new Array(25).fill(0);
    newCombinedSquaresList.forEach((_,i)=>{
        if (newCombinedSquaresList[i]!=0){
             newSquaresColors[i]=newCombinedSquaresList[i].getAttribute("fill")
        }
        else{
            newSquaresColors[i]=0
        }
       
    })
    console.log("SquareColors")
    console.log(newSquaresColors)
    setSquaresColors((prev)=>[...prev,...newSquaresColors])
    
}


//console.log(squaresColors)


let colorCombinations=[["red","orange"],["#1f51ff","#00d800"],["orange","red"],["#00d800","#1f51ff"]]

function getPossibleArrows(){
    if (squaresColors.length === 0) return;
    if (scrambleIndex.current==6) return;
    let Priority = [6,16,8,18,23,21,19,9,15];
    let NewPriority=[]
    let tempArrowCombination=[]

    Priority.forEach(index => {
      if (squaresColors[squaresColors.length-1][index] !== "yellow") {
        NewPriority.push(index)
      }
    });
    for (let colorindex=0 ;colorindex<4;colorindex++){
        
        if(scrambleIndex.current==0){
            // console.log("ITs Red")
            // console.log(colorindex)
            // console.log(NewPriority)
            // console.log(squaresColors[6])
            // console.log(squaresColors[15])
        }
     for (let i = 0; i < NewPriority.length; i++) {
        let index = NewPriority[i];
        //console.log("Indeces")
        //console.log(index,colorindex)
        
        if (squaresColors[squaresColors.length-1][index] == colorCombinations[colorindex][0]) {
            //console.log("NewIndex")
            //console.log(index)
            for (let j = 0; j < NewPriority.length; j++) {
                let index2 = NewPriority[j];
                if(index!=index2){
                    let skip=false
                     for (let k = 0; k < tempArrowCombination.length; k++) {
                        if(tempArrowCombination[k][0]==index2 && tempArrowCombination[k][1]==index){
                            skip=true
                        }
                    }

                if(skip==false){

                    //console.log(index,index2)
                    
                    let xdifference=(Centers[index][0]-Centers[index2][0])
                    let ydifference=(Centers[index][1]-Centers[index2][1])
                    let penalty=0
                    if(index==15||index==9){
                        penalty+=20
                    }
                    if(index==21||index==19){
                        penalty+=10
                    }
                    if(index2==15||index2==9){
                        penalty+=20
                    }
                    if(index2==21||index2==19){
                        penalty+=10
                    }
                if (squaresColors[squaresColors.length-1][index2] == colorCombinations[colorindex][1]) {
                    tempArrowCombination.push([index, index2,"opp",penalty]);
                }
                else if (squaresColors[squaresColors.length-1][index2] == colorCombinations[colorindex][0]) {
                    tempArrowCombination.push([index, index2,"same",penalty]);
                }
                else {
                    tempArrowCombination.push([index, index2,"adj",penalty]);
                }
                
            }
            
        }}
        }
        }
        
    }
    console.log("New Combination")
    console.log(tempArrowCombination)
    
  
if(arrowCombination.length<6){
    setArrowCombination((prev) => {
  let tempInSet = prev.some(existing =>
    JSON.stringify(existing) === JSON.stringify(tempArrowCombination)
  );

  if (!tempInSet) {
    return [...prev, tempArrowCombination];
  }

  return prev;
});
}
 

    }

  return (
        
        <>
        <h2>{angleList[0]}</h2>
        <div className='CpRecContainer' ref={overlayRef}>
              <CaseImage
                size={200}
                //alg={""+scramble2.replace(/\s+/g, "")+"y2"}
                   alg={arrowCombination.length > 0 ? scramble.replace(/\s+/g, "")+"y2": "R U R' U R U2 R'".replace(/\s+/g, "")+"y2"}
                caseSetDetails={ScrambleVisualizerDetails}
                co="40"
            ></CaseImage>
            <div className='CpRecOverlay'>
                {/* <svg width="100%" height="100%">
                    <polygon 
                    points="37,37 117,37 117,33 128,38 117,45 117,41 37,41" 
                    fill="rgba(255, 255, 255, 1)" 
                    stroke="rgba(8, 4, 4, 1)" 
                    strokeWidth="1"
                    transform="rotate(0 60 60)"
                    />
                </svg> */}
                {/* <svg style={{position:"absolute"}}id="GoodLine" width="100%" height="100%">
                    <path
                        d={pathArrow1}
                        fill="rgba(255, 0, 0, 1)"
                        stroke="rgba(0, 0, 0, 1)"
                        strokeWidth="1"
                        transform="rotate(0 127 39)"
                    />
                </svg> */}
                {
                    angleList.map((_,i)=>{
                        return (<>
                             <svg style={{position:"absolute"}}id="GoodLine" width="100%" height="100%">
                                <path
                                    d={pathArrowList[i]}
                                    fill={`${arrowColor[i]}`}
                                    stroke="rgba(0, 0, 0, 1)"
                                    strokeWidth="1"
                                    transform={`rotate(${angleList[i]} ${centerx2List[i]+1.25} ${centery2List[i]})`}
                                />
                            </svg>
                        </>)
                    })
                }
                {/* <svg style={{position:"absolute"}}id="GoodLine" width="100%" height="100%">
                    <path
                        d={pathArrowList[0]}
                        fill="rgba(4, 0, 255, 1)"
                        stroke="rgba(0, 0, 0, 1)"
                        strokeWidth="1"
                        transform={`rotate(${angleList[0]} ${centerx2List[0]+1.25} ${centery2List[0]})`}
                    />
                </svg> */}
                {/* <svg style={{position:"absolute"}}id="GoodLine" width="100%" height="100%">
                    <path
                        d={centerPathList[0]}
                        fill="rgba(0, 255, 21, 0.5)"
                        stroke="rgba(0, 0, 0, 1)"
                        strokeWidth="0"
                        
                    />
                </svg>
                <svg style={{position:"absolute"}}id="GoodLine" width="100%" height="100%">
                    <path
                        d={centerPath2List[0]}
                        fill="rgba(0, 255, 21, 0.5)"
                        stroke="rgba(0, 0, 0, 1)"
                        strokeWidth="0"
                        
                    />
                </svg> */}
            </div>
            <div className='CpGridOverlay'>
                
            </div>
        </div>
        </>
    )

}

export default CpPage