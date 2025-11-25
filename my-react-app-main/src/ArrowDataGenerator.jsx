
import { ThemeContext } from './DarkThemeContext.jsx';
import React, { use, useContext,useRef, useEffect, useState } from "react";
import "./index.css"
import { FaIcon } from './fontAwesome.js';
import CaseImage from "./cubing/cubeImage.jsx";
import Stopwatch from './Stopwatch.jsx';
import { difference, get } from 'lodash';
import html2canvas from "html2canvas";
import { flushSync } from 'react-dom';
import ollCaseSet from "./data/ollCaseSet.js";
import { json } from 'react-router-dom';


function CornerPermutationPage({testedAlgs,setButtonClicked,setCaseClicked}){

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
const [scramble, setScramble] = useState("");

const [altscramble,setAltScramble] = useState(Array(4).fill("null"));
const [AUF,setAUF]=useState([])
const [barMovements,setBarMovements]=useState([])

const [arrowCombinationSorted,setArrowCombinationSorted]= useState(false)
const [arrowDone,setArrowDone]=useState(false)


const [tempArrowSet, setTempArrowSet] = useState(new Set());
const [possibleArrowCombination, setPossibleArrowCombination] = useState(new Set());

const [jsonArrowsToExport,setJsonArrowsToExport]=useState([])

    let T_Perm="R U R' U' R' F R2 U' R' U' R U R' F'"
    let Y_Perm="F R U' R' U' R U R' F' R U R' U' R' F R F'"

    
    let algRef=useRef(0)
    let algIndexRef=useRef(0)
    
    //let algScramble=ollCaseSet.cases[algRef.current].algs[0]

    let CornerPermutations=["",T_Perm,"U2"+T_Perm,"U"+T_Perm,"U'"+T_Perm,Y_Perm]
    let allAUF=["","U'","U","U2"]
    const ScrambleVisualizerDetails={
    id: "oll",
    title: "OLL",
    subTitle: "Full OLL",
    view: "plan",
    stage:"cross",
    numCases: 57,
  }

  let pathArrow1="M 37,37 L 117,37 L 117,33 L 127,39 L 117,43 L 117,41 L 37,41 37,45 27,39 37,33 Z"



const xCoords = [9.5, 39.5, 79.5, 119.5,149.5];
const yCoords = [9.75, 39.75, 79.75, 119.75, 149.75];

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

let centerpath=`M ${centerx+0.5},${centery} L ${centerx+0.5},${centery+1} L ${centerx+1},${centery+1} L ${centerx+1},${centery} L ${centerx},${centery} Z`


// centerx=Centers[Center2][0]                                                               
// centery=Centers[Center2][1]
// let centerpath2=`M ${centerx},${centery} L ${centerx},${centery+2} L ${centerx+2},${centery+2} L ${centerx+2},${centery} L ${centerx},${centery} Z`
centerx=Centers[Center2][0]                                                               
centery=Centers[Center2][1]

let centerpath2=`M ${centerx+0.5},${centery} L ${centerx+0.5},${centery+1} L ${centerx+1},${centery+1} L ${centerx+1},${centery} L ${centerx},${centery} Z`



centerx=Centers[Center1][0]
centery=Centers[Center1][1]

centerx2=Centers[Center2][0]
centery2=Centers[Center2][1]
centerx=centerx2-((centerx-centerx2)**2+(centery-centery2)**2)**(1/2)                                                                                                                                                                                                                                                                                                                   //L 37,41 37,45 27,39 37,33 Z"
centery2+=1

let pathArrow2=`M ${centerx+3},${centery2-2} L ${centerx2-1},${centery2-2} L ${centerx2-1},${centery2-6} L ${centerx2+8},${centery2} L ${centerx2-1},${centery2+6} L ${centerx2-1},${centery2+2} L ${centerx+3},${centery2+2} L ${centerx+3},${centery2+2} L ${centerx+3},${centery2+6} L ${centerx-6},${centery2} L ${centerx+3},${centery2-6}  Z`
console.log()
console.log()
console.log()
console.log("Patharrow")
console.log(pathArrow2)
console.log(centerpath)
console.log(centerx2)
console.log(centery2)
console.log()
console.log()
console.log()
console.log()


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

let algAUF=""
function Inverse(alg){

    console.log(`InverseAlgStart ${alg}`)
    let inverse=""
    let splitAlg=alg.split(" ")
    for(let i=splitAlg.length-1;i>=0;i--){
        let part=splitAlg[i][0]
        //console.log(`InverseAlgPart ${part}`)
        inverse+=" "+part
        if(splitAlg[i][1]!="'" &&splitAlg[i][1]!=2){
            inverse+="'"
        }
        else if(splitAlg[i][1]==2){
            inverse+="2"
        }
    }
    console.log(`InverseAlgEnd ${inverse}`)

    return inverse
}
useEffect(() => {
    console.log("Here")
    //setScramble("" + CornerPermutations[scrambleIndex.current]);

    setScramble(ollCaseSet.cases[algRef.current].algs[algIndexRef.current] + CornerPermutations[scrambleIndex.current]);
    
    
   
   
    let alg1=ollCaseSet.cases[algRef.current].algs[0]
    let alg2=ollCaseSet.cases[algRef.current].algs[1]
    if(alg2==undefined){
        alg2=alg1
    }
    

    if(algIndexRef.current==1){
        alg1=ollCaseSet.cases[algRef.current].algs[1]
        alg2=ollCaseSet.cases[algRef.current].algs[0]
    }
    alg2=Inverse(alg2)
    
    setAltScramble(
        new Array(4).fill("").map((_,i)=>
            alg2+allAUF[i] +alg1+
            CornerPermutations[scrambleIndex.current]
        )
    );
}, []);

//Whenever scramble changes, reset lists & read squares
useEffect(() => {
    console.log(`ScrambleIndex,${scrambleIndex.current}`)
    console.log(scramble)
    if (!scramble && scramble!="") return;
    console.log("run")

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
  }, 10);

  return () => clearTimeout(timeout);
}, [scramble]);

useEffect(() => {
  if (!squaresColors || squaresColors.length === 0) return;
  getPossibleArrows(squaresColors); // pass in current colors
}, [squaresColors]);

//After arrows are generated → go to next scramble
useEffect(() => {
    console.log("Here???")
    console.log(scrambleIndex.current)
    console.log(arrowCombination)
    if (arrowCombination.length==CornerPermutations.length){
        setArrowDone(true)
    }
    if (arrowCombination.length === 0) return;
//CornerPermutations.length
    if (scrambleIndex.current + 1 < CornerPermutations.length) {
        scrambleIndex.current += 1;
        
        //setScramble("" + CornerPermutations[scrambleIndex.current]);
        setScramble(ollCaseSet.cases[algRef.current].algs[algIndexRef.current] + CornerPermutations[scrambleIndex.current]);
        
        let alg1=ollCaseSet.cases[algRef.current].algs[0]
        let alg2=ollCaseSet.cases[algRef.current].algs[1]
        if(alg2==undefined){
            alg2=alg1
        }
        //console.log(`PreAlg2: ${alg2}`)
        
    function Inverse(alg){

        //console.log(`InverseAlgStart ${alg}`)
        let inverse=""
        let splitAlg=alg.trim().split(" ")
        for(let i=splitAlg.length-1;i>=0;i--){
            let part=splitAlg[i][0]
            //console.log(`InverseAlgPart ${part}`)
            inverse+=" "+part
            if(splitAlg[i][1]!="'" &&splitAlg[i][1]!=2){
                inverse+="'"
            }
            else if(splitAlg[i][1]==2){
                inverse+="2"
            }
        }
        //console.log(`InverseAlgEnd ${inverse}`)

        return inverse
    }
        if(algIndexRef.current==1){
        alg1=ollCaseSet.cases[algRef.current].algs[1]
        alg2=ollCaseSet.cases[algRef.current].algs[0]
    }
        alg2=Inverse(alg2)
        //console.log(`Alg1: ${alg1}`)
        //console.log(`Alg2: ${alg2}`)
        let testscramble=alg2
        setAltScramble(
        new Array(4).fill("").map((_,i)=>
            alg2+allAUF[i] +alg1+
            CornerPermutations[scrambleIndex.current]
            //testscramble+CornerPermutations[scrambleIndex.current]
            
        )
    );


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
    //console.log(`ScrambleIndex,${scrambleIndex.current}`)
    //console.log(arrowCombination)
     if(scrambleIndex.current===5 &&arrowCombination.length==6){
        // console.log("Continue")
        
        let newArray=[]
        //console.log(arrowCombination.length)
        for (let j=0;j<Math.min(arrowCombination.length,6);j++){
            // console.log("Continue2")
            let partOfArray=arrowCombination[j]
            // console.log(partOfArray)
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


function EasyRecognition(){

    let PossibleCombination=[]
    let AllCombination=[]
    let ReducedCombinations=[]
        
     for (let index1=0;index1<arrowCombination[0].length;index1++){
        
             for (let index2=0;index2<arrowCombination[0].length;index2++){//Second Arrow Indices
                let tempset=new Set()
                let allCombSet=new Set()
                for( let index3=0;index3<arrowCombination.length;index3++){ //ScrambleCornerPermutation
                    let skip=false
                
                let center1a=arrowCombination[index3][index1][0]
                let center1b=arrowCombination[index3][index1][1]
                let center2a=arrowCombination[index3][index2][0]
                let center2b=arrowCombination[index3][index2][1]
                
                if(index3==0){
                    
                     if(arrowCombination[index3][index1][2]=="adj"){
                        skip=true
                     }
                     if(arrowCombination[index3][index2][2]=="adj"){
                            skip=true
                        }
                }
                if(index3==6){
                    
                     if(arrowCombination[index3][index1][2]=="adj"){
                        skip=true
                     }
                     if(arrowCombination[index3][index2][2]=="adj"){
                            skip=true
                        }
                }
                if(index2>=index1){
                    skip=true
                }

                if(!skip){
                    if(center1a>center1b){
                    [center1b,center1a]=[center1a,center1b]
                }
                if(center2a>center2b){
                    [center2b,center2a]=[center2a,center2b]
                }
                
                let totalpenalty=arrowCombination[index3][index1][3]+arrowCombination[index3][index2][3]
                let leftUsed=false
                let rightUsed=false
                if(center1a==9||center1a==19||center1b==9 ||center1b==19||center2a==9||center2a==19||center2b==9||center2b==19 ){
                    leftUsed=true

                }
                if(center1a==15 ||center1b==15||center2a==15||center2b==15){
                    rightUsed=true
                }
                if(leftUsed &&rightUsed){
                    totalpenalty+=1000
                }


                tempset.add(JSON.stringify([center1a,center1b,arrowCombination[index3][index1][2],center2a,center2b,arrowCombination[index3][index2][2],totalpenalty]))
                
                }
               if(center1a>center1b){
                    [center1b,center1a]=[center1a,center1b]
                }
                if(center2a>center2b){
                    [center2b,center2a]=[center2a,center2b]
                }

                let totalpenalty=arrowCombination[index3][index1][3]+arrowCombination[index3][index2][3]
                
                allCombSet.add(JSON.stringify([center1a,center1b,arrowCombination[index3][index1][2],center2a,center2b,arrowCombination[index3][index2][2],totalpenalty]))
                
                
            }
           
             if(tempset.size==6){
                //  console.log("Tempset")
                // console.log(tempset)
                let setToArray = Array.from(tempset).map(JSON.parse);;
                PossibleCombination.push(setToArray)
             }
             if(allCombSet.size==6){
                let setToArray = Array.from(allCombSet).map(JSON.parse);;
                AllCombination.push(setToArray)
             }
            //  if(tempset.size>6){
            //      console.log("BigTempset")
            //     console.log(tempset)
            //  }

            
             
             
                }
            }
        
        // console.log("FilterCheck")
        // console.log(PossibleCombination)
        for(let i=0;i<PossibleCombination.length;i++){
            let easyrec=true
            for(let j=0;j<PossibleCombination[i].length;j++){
            // console.log(`This is ${i},${j}`)
            // console.log(PossibleCombination[i][j])
            if(1<=j && j<=4){
                if(PossibleCombination[i][j][2]!="adj" &&PossibleCombination[i][j][5]!="adj"){
                    // console.log("ISFIlterGood")
                    // console.log(PossibleCombination[i][j][2])
                    // console.log(PossibleCombination[i][j][5])
                    easyrec=false
                }
            }
            }
            if(easyrec){
                // console.log("Filterd")
                // console.log(PossibleCombination[i])
                //console.log("Pushed")
                ReducedCombinations.push(PossibleCombination[i])
            }
        }
    
    let LowestPenalty=[]
    let minpenalty=1000
    // console.log("possiblecombi")
    // console.log(AllCombination)
        for (let i=0;i<AllCombination.length;i++){
        //console.log(AllCombination[i][0][6])
        if(AllCombination[i][0][6]<minpenalty){
            minpenalty=AllCombination[i][0][6]
        }
    }

    let k=0
    while(LowestPenalty.length<3 &&k<=20){
        for (let i=0;i<AllCombination.length;i++){
            if(AllCombination[i][0][6]<=minpenalty+k){
                LowestPenalty.push(AllCombination[i])
            }
        }
        k=k+5

    }
    

    if(ReducedCombinations.length==0){
        ReducedCombinations=PossibleCombination
    }

    minpenalty=10000
    // console.log("FullArray")
    // console.log(ReducedCombinations)
    for (let i=0;i<ReducedCombinations.length;i++){
        // console.log("ReducedNotempty")
        // console.log(ReducedCombinations[i][0][6])
        if(ReducedCombinations[i][0][6]<minpenalty){
            minpenalty=ReducedCombinations[i][0][6]
        }
    }
    let LowestPenaltyEasy=[]
    
    k=0
    while ((LowestPenaltyEasy.length<3 &&k<=20)){
        //console.log("Enter While")
        for (let i=0;i<ReducedCombinations.length;i++){
            //console.log(minpenalty,ReducedCombinations[i][0])
            if(ReducedCombinations[i][0][6]==minpenalty+k){
                LowestPenaltyEasy.push(ReducedCombinations[i])
                //console.log("Pushed")
            }
        }
        k=k+5
    }

    // console.log("Lowest Penalty")
    // console.log(LowestPenaltyEasy)

    

    let dict ={
        name:ollCaseSet.cases[algRef.current].name,
        //easierRecognition:LowestPenaltyEasy,
        //lowestPenaltyRecognition:LowestPenalty
        
    }
    // console.log("Wait")
    // console.log(jsonArrowsToExport)
    // console.log(groupdict)
    // console.log(dict)
    
    jsonArrowsToExport.forEach((item)=>{
        // console.log(item.name)
        // console.log(dict)
        console.log(item.name===dict.name)
    })
    // setJsonArrowsToExport(prev=>
    //     prev.map(item=>
    //         item.name===dict.name?{...item,...dict}:item
    //     )
    // )

    // console.log(`What is Dict, ${JSON.stringify(dict)}`)
    // console.log(`What is GroupDict, ${JSON.stringify(groupdict)}`)
    setJsonArrowsToExport(prev=>
    [...prev,{...groupdict,...dict}]
    )

    if(algRef.current+1<ollCaseSet.cases.length){
        if(algIndexRef.current==1){
            algIndexRef.current=0
            algRef.current+=1
        }
        else if(algIndexRef.current==0){
            algIndexRef.current=1
            console.log(`Undefined?,  ${ollCaseSet.cases[algRef.current].algs[algIndexRef.current]}`)
            if(ollCaseSet.cases[algRef.current].algs[algIndexRef.current]==undefined){
                algIndexRef.current=0
                algRef.current+=1
            }
            
        }
        
        
        if(algRef.current==1){
            algRef.current=1
        }
        console.log(`Through, ${algRef.current}`)
        console.log()

   
    scrambleIndex.current=0
    setPathArrowList([]);
    setAngleList([]);
    setCenterPathList([]);
    setCenterPath2List([]);
    setCenterxList([]);
    setCenterx2List([]);
    setCenteryList([]);
    setCentery2List([]);
    setSquaresColors([]);
    setArrowCombination([]);
    setArrowColor([]);
    setArrowCombinationSorted(false);
    setArrowDone(false);

    setScramble(ollCaseSet.cases[algRef.current].algs[algIndexRef.current])

    let alg1=ollCaseSet.cases[algRef.current].algs[0]
    let alg2=ollCaseSet.cases[algRef.current].algs[1]
    function Inverse(alg){

        console.log(`InverseAlgStart ${alg}`)
        let inverse=""
        let splitAlg=alg.trim().split(" ")
        for(let i=splitAlg.length-1;i>=0;i--){
            let part=splitAlg[i][0]
            console.log(`InverseAlgPart ${part}`)
            inverse+=" "+part
            if(splitAlg[i][1]!="'" &&splitAlg[i][1]!=2){
                inverse+="'"
            }
            else if(splitAlg[i][1]==2){
                inverse+="2"
            }
        }
        console.log(`InverseAlgEnd ${inverse}`)

        return inverse
    }
    if(alg2==undefined){
        alg2=alg1
    }
    if(algIndexRef.current==1){
        alg1=ollCaseSet.cases[algRef.current].algs[1]
        alg2=ollCaseSet.cases[algRef.current].algs[0]
    }
    alg2=Inverse(alg2)
      
    setAUF([])
    setBarMovements([])
    setAltScramble(
        new Array(4).fill("").map((_,i)=>
            alg2+allAUF[i] +alg1+
            CornerPermutations[scrambleIndex.current] 
            //CornerPermutations[scrambleIndex.current]
        )
    );

     }


    // if(LowestPenaltyEasy.length>0){
    //     let color
    //     if(LowestPenaltyEasy[0][0][2]=="same"){
    //         color="blue"
    //     }
    //     else{
    //         color="red"
    //     }
        
    //     Arrow(LowestPenaltyEasy[0][0][0],LowestPenaltyEasy[0][0][1],color)
    //     if(LowestPenaltyEasy[0][0][5]=="same"){
    //         color="blue"
    //     }
    //     else{
    //         color="red"
    //     }
        
    //     Arrow(LowestPenaltyEasy[0][0][3],LowestPenaltyEasy[0][0][4],color)
    // }
}

let groupdict




function getRotation(Center1,Center2){ 

 
    
    const xCoords = [9.5, 39.5, 79.5, 119.5,149.5];
    const yCoords = [9.75, 39.75, 79.75, 119.75, 149.75];

    let Centers = [];

    for (let y of yCoords) {
    for (let x of xCoords) {
        Centers.push([x, y]);
    }
    }

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

    angle=Math.round(angle)
    
    return angle

}

function GroupRecognition(){
    let FirstPairOppTrueList=[]
    let SecondPairOppTrueList=[]
    let ThirdPairOppTrueList=[]
    let FirstPairSameTrueList=[]
    let SecondPairSameTrueList=[]
    let ThirdPairSameTrueList=[]
    let FirstPairBothTrueList=[]
    let SecondPairBothTrueList=[]
    let ThirdPairBothTrueList=[]

    let FirstPairSameOppTrueList=[]
    let SecondPairSameOppTrueList=[]
    let ThirdPairSameOppTrueList=[]

    let Pairs=[[0,5],[1,2],[3,4]]
    
    console.log(arrowCombination)
    for (let j=0;j<Pairs.length;j++){
    //for (let j=0;j<1;j++){
        for (let index1=0;index1<arrowCombination[0].length;index1++){
            let oppTrue=false
            let sameTrue=false
            let bothTrue=false
            let sameOppTrue=false
            // console.log("Loop")
            // console.log(arrowCombination[Pairs[j][0]])
            // console.log(arrowCombination[Pairs[j][0]][index1])
            // console.log(arrowCombination[Pairs[j][1]][index1])
            if(arrowCombination[Pairs[j][0]][index1][2]=="opp" &&arrowCombination[Pairs[j][1]][index1][2]=="opp"){
                oppTrue=true
            }
            if(arrowCombination[Pairs[j][0]][index1][2]=="same" &&arrowCombination[Pairs[j][1]][index1][2]=="same"){
                sameTrue=true
            }
            if(arrowCombination[Pairs[j][0]][index1][2]!="adj" &&arrowCombination[Pairs[j][1]][index1][2]!="adj"){
                if(oppTrue==false &&sameTrue==false)
                bothTrue=true
            }  
            if(arrowCombination[Pairs[j][0]][index1][2]!="adj" && arrowCombination[Pairs[j][1]][index1][2]!="adj" &&arrowCombination[Pairs[j][0]][index1][2]!=arrowCombination[Pairs[j][1]][index1][2]){
                sameOppTrue=true
            }

            if(oppTrue){
                
                let unique=true
                // console.log("test")
                // console.log(arrowCombination[Pairs[j][0]][index1])
                // console.log(arrowCombination[Pairs[j][0]][index1][2])
                for (let i=0; i<6;i++){
                    if(i!=Pairs[j][0] && i!=Pairs[j][1]){
                        if(arrowCombination[i][index1][2]=="opp"){
                            unique=false
                            //console.log(arrowCombination[Pairs[j][0]][index1],j)
                            break
                        }
                    }
                    
                }

                if(unique){
                    for( let index2=0;index2<arrowCombination[0].length;index2++){
                        if(index2!=index1){
                        if (arrowCombination[Pairs[j][0]][index2][2]!="adj" && arrowCombination[Pairs[j][1]][index2][2]!="adj"){
                            if(arrowCombination[Pairs[j][0]][index2][2]!=arrowCombination[Pairs[j][1]][index2][2]){
                            
                            // console.log()
                            // console.log()
                            // console.log()
                            // console.log()

                            // console.log(arrowCombination)
                            // console.log()
                            // console.log()
                            // console.log()

                            
                            let center1a=arrowCombination[Pairs[j][0]][index1][0]
                            let center1b=arrowCombination[Pairs[j][0]][index1][1]
                            let center2a=arrowCombination[Pairs[j][0]][index2][0]
                            let center2b=arrowCombination[Pairs[j][0]][index2][1]
                            
                            
                            
                            let totalpenalty=arrowCombination[Pairs[j][0]][index1][3]+arrowCombination[Pairs[j][0]][index2][3]
                            
                            let leftUsed=false
                            let rightUsed=false
                            if(center1a==9||center1a==19||center1b==9 ||center1b==19||center2a==9||center2a==19||center2b==9||center2b==19 ){
                                leftUsed=true

                            }
                            if(center1a==15 ||center1b==15||center2a==15||center2b==15){
                                rightUsed=true
                            }
                            if(leftUsed &&rightUsed){
                                totalpenalty=1000
                            }
                            let ArrayToPush= [[center1a,center1b,arrowCombination[Pairs[j][0]][index1][2],center2a,center2b,arrowCombination[Pairs[j][0]][index2][2],totalpenalty]]
                            ArrayToPush.push([center1a,center1b,arrowCombination[Pairs[j][1]][index1][2],center2a,center2b,arrowCombination[Pairs[j][1]][index2][2],totalpenalty])
                            if(j==0){
                                FirstPairOppTrueList.push(ArrayToPush)
                            }
                            if(j==1){
                                SecondPairOppTrueList.push(ArrayToPush)
                            }
                            if(j==2){
                                ThirdPairOppTrueList.push(ArrayToPush)
                               
                            }
                        }
                    }
                    }
                }
                }
            }


            if(sameTrue){
                
                let unique=true
                // console.log("test")
                // console.log(arrowCombination[Pairs[j][0]][index1])
                // console.log(arrowCombination[Pairs[j][0]][index1][2])
                for (let i=0; i<6;i++){
                    if(i!=Pairs[j][0] && i!=Pairs[j][1]){
                        if(arrowCombination[i][index1][2]=="opp"){
                            unique=false
                            //console.log(arrowCombination[Pairs[j][0]][index1],j)
                            break
                        }
                    }
                    
                }

                if(unique){
                    for( let index2=0;index2<arrowCombination[0].length;index2++){
                        if(index2!=index1){
                        if (arrowCombination[Pairs[j][0]][index2][2]!="adj" && arrowCombination[Pairs[j][1]][index2][2]!="adj"){
                            if(arrowCombination[Pairs[j][0]][index2][2]!=arrowCombination[Pairs[j][1]][index2][2]){
                        
                            let center1a=arrowCombination[Pairs[j][0]][index1][0]
                            let center1b=arrowCombination[Pairs[j][0]][index1][1]
                            let center2a=arrowCombination[Pairs[j][0]][index2][0]
                            let center2b=arrowCombination[Pairs[j][0]][index2][1]
                            
                            let totalpenalty=arrowCombination[Pairs[j][0]][index1][3]+arrowCombination[Pairs[j][0]][index2][3]
                            
                            let leftUsed=false
                            let rightUsed=false
                            if(center1a==9||center1a==19||center1b==9 ||center1b==19||center2a==9||center2a==19||center2b==9||center2b==19 ){
                                leftUsed=true

                            }
                            if(center1a==15 ||center1b==15||center2a==15||center2b==15){
                                rightUsed=true
                            }
                            if(leftUsed &&rightUsed){
                                totalpenalty=1000
                            }
                            let ArrayToPush= [[center1a,center1b,arrowCombination[Pairs[j][0]][index1][2],center2a,center2b,arrowCombination[Pairs[j][0]][index2][2],totalpenalty]]
                            ArrayToPush.push([center1a,center1b,arrowCombination[Pairs[j][1]][index1][2],center2a,center2b,arrowCombination[Pairs[j][1]][index2][2],totalpenalty])
                            if(j==0){
                                FirstPairSameTrueList.push(ArrayToPush)
                            }
                            if(j==1){
                                SecondPairSameTrueList.push(ArrayToPush)
                            }
                            if(j==2){
                                ThirdPairSameTrueList.push(ArrayToPush)
                            }
                        }
                    }
                    }
                    }
                }
            }


            if(bothTrue){
                
                let unique=true
                // console.log("test")
                // console.log(arrowCombination[Pairs[j][0]][index1])
                // console.log(arrowCombination[Pairs[j][0]][index1][2])
                for (let i=0; i<6;i++){
                    if(i!=Pairs[j][0] && i!=Pairs[j][1]){
                        if(arrowCombination[i][index1][2]=="opp"){
                            unique=false
                            //console.log(arrowCombination[Pairs[j][0]][index1],j)
                            break
                        }
                    }
                    
                }

                if(unique){
                    for( let index2=0;index2<arrowCombination[0].length;index2++){
                        if(index2!=index1){
                        if (arrowCombination[Pairs[j][0]][index2][2]!="adj" && arrowCombination[Pairs[j][1]][index2][2]!="adj"){
                            if(arrowCombination[Pairs[j][0]][index2][2]!=arrowCombination[Pairs[j][1]][index2][2]){
                        
                            let center1a=arrowCombination[Pairs[j][0]][index1][0]
                            let center1b=arrowCombination[Pairs[j][0]][index1][1]
                            let center2a=arrowCombination[Pairs[j][0]][index2][0]
                            let center2b=arrowCombination[Pairs[j][0]][index2][1]
                            
                            let totalpenalty=arrowCombination[Pairs[j][0]][index1][3]+arrowCombination[Pairs[j][0]][index2][3]
                            
                            let leftUsed=false
                            let rightUsed=false
                            if(center1a==9||center1a==19||center1b==9 ||center1b==19||center2a==9||center2a==19||center2b==9||center2b==19 ){
                                leftUsed=true

                            }
                            if(center1a==15 ||center1b==15||center2a==15||center2b==15){
                                rightUsed=true
                            }
                            if(leftUsed &&rightUsed){
                                totalpenalty=1000
                            }
                            let ArrayToPush= [[center1a,center1b,arrowCombination[Pairs[j][0]][index1][2],center2a,center2b,arrowCombination[Pairs[j][0]][index2][2],totalpenalty]]
                            ArrayToPush.push([center1a,center1b,arrowCombination[Pairs[j][1]][index1][2],center2a,center2b,arrowCombination[Pairs[j][1]][index2][2],totalpenalty])
                            if(j==0){
                                FirstPairOppTrueList.push(ArrayToPush)
                            }
                            if(j==1){
                                SecondPairBothTrueList.push(ArrayToPush)
                            }
                            if(j==2){
                                ThirdPairBothTrueList.push(ArrayToPush)
                            }
                        }
                    }
                    }
                }
                }
            }

            if(sameOppTrue){
                
                let unique=true
                // console.log("test")
                // console.log(arrowCombination[Pairs[j][0]][index1])
                // console.log(arrowCombination[Pairs[j][0]][index1][2])
                // console.log()
                // console.log()
                // console.log("SameOPPTRUEPASS0")
                // console.log(arrowCombination[Pairs[j][0]][index1],arrowCombination[Pairs[j][1]][index1])
                // console.log()
                // console.log()
                // console.log()

                // for (let i=0; i<3;i++){
                //     if(i!=j){
                //         if(arrowCombination[Pairs[i][0]][index1][2]==arrowCombination[Pairs[j][0]][index1][2] && arrowCombination[Pairs[i][1]][index1][2]==arrowCombination[Pairs[j][1]][index1][2]){
                //             unique=false
                            
                //             //console.log(arrowCombination[Pairs[j][0]][index1],j)
                //             break
                //         }
                //         // if(arrowCombination[Pairs[i][0]][index1][2]==arrowCombination[Pairs[j][1]][index1][2] && arrowCombination[Pairs[i][1]][index1][2]==arrowCombination[Pairs[j][0]][index1][2]){
                //         //     unique=false
                //         //     console.log(arrowCombination[Pairs[i][0]][index1][2],arrowCombination[Pairs[j][0]][index1][2])
                //         //     console.log(arrowCombination[Pairs[i][1]][index1][2],arrowCombination[Pairs[j][1]][index1][2])
                           
                //         //      console.log(i,j)
                //         //     console.log("NotUnique")
                //         //     //console.log(arrowCombination[Pairs[j][0]][index1],j)
                //         //     break
                //         // }
                //     }
                    
                // }

                if(unique){
                    // console.log()
                    // console.log()
                    // console.log("SameOPPTRUEPASS1")
                    // console.log(arrowCombination[Pairs[j][0]][index1],arrowCombination[Pairs[j][1]][index1])
                    // console.log()
                    // console.log()
                    // console.log()
                    for( let index2=0;index2<arrowCombination[0].length;index2++){
                        if(index2!=index1){
                         if(arrowCombination[Pairs[j][0]][index2][2]!="adj" && arrowCombination[Pairs[j][1]][index2][2]!="adj"){
                            if(index1!=index2){

                            
                            
                            // console.log()
                            // console.log()
                            // console.log()
                            // console.log()
                            // console.log("SameOppTrue")
                            // console.log(arrowCombination)
                            // console.log()
                            // console.log()
                            // console.log()

                            
                            let center1a=arrowCombination[Pairs[j][0]][index1][0]
                            let center1b=arrowCombination[Pairs[j][0]][index1][1]
                            let center2a=arrowCombination[Pairs[j][0]][index2][0]
                            let center2b=arrowCombination[Pairs[j][0]][index2][1]

                            
                           
                            // console.log()
                            // console.log()
                            // console.log()
                            // console.log("GetRotation")
                            // console.log(center1a,center1b)
                            let angle1=getRotation(center1a,center1b)
                            // console.log(center2a,center2b)
                            let angle2=getRotation(center2a,center2b)
                            // console.log()
                            // console.log()
                            // console.log()
                            
                            let anglepenalty=0
                            // console.log(center1a,center1b,angle1)
                            // console.log(center2a,center2b,angle2)
                            if(angle1==135){
                                angle1=45
                            }
                            if(angle2==135){
                                angle2=45
                            }
                            if(angle1!=angle2){
                                // console.log("Penalty")
                                
                                anglepenalty+=20
                            }
                            angle1=angle1%90
                            angle2=angle2%90
                            
                            
                            let totalpenalty=arrowCombination[Pairs[j][0]][index1][3]+arrowCombination[Pairs[j][0]][index2][3]
                            
                            
                            if(angle1==45){
                                anglepenalty+=5
                            }
                            if(angle2==45){
                                anglepenalty+=5
                            }
                            if(angle1!=45 &&angle1!=0){
                                anglepenalty+=15
                            }
                            if(angle2!=45 &&angle2!=0){
                                anglepenalty+=15
                            }
                            
                            totalpenalty+=anglepenalty
                            

                            let leftUsed=false
                            let rightUsed=false
                            if(center1a==9||center1a==19||center1b==9 ||center1b==19||center2a==9||center2a==19||center2b==9||center2b==19 ){
                                leftUsed=true

                            }
                            if(center1a==15 ||center1b==15||center2a==15||center2b==15){
                                rightUsed=true
                            }
                            if(leftUsed &&rightUsed){
                                totalpenalty+=1000
                            }

                            
                            let corner1used=0
                            let corner2used=0
                            let corner3used=0
                            let corner4used=0
                            
                            let corner1=[6]
                            let corner2=[8,9]
                            let corner3=[16,15,21]
                            let corner4=[18,19,23]
                            let CentersUsed=[center1a,center1b,center2a,center2b]
                            
                            corner1.forEach(corner=>{
                                if(CentersUsed.includes(corner)){
                                    corner1used=1
                                }
                            })
                            corner2.forEach(corner=>{
                                if(CentersUsed.includes(corner)){
                                    corner2used=1
                                }
                            })
                            corner3.forEach(corner=>{
                                if(CentersUsed.includes(corner)){
                                    corner3used=1
                                }
                            })
                            corner4.forEach(corner=>{
                                if(CentersUsed.includes(corner)){
                                    corner4used=1
                                }
                            })

                            let sumcorners= corner1used+corner2used+corner3used+corner4used
                            if(sumcorners<3){
                                totalpenalty+=10000
                            }
                            let ArrayToPush= [[center1a,center1b,arrowCombination[Pairs[j][0]][index1][2],center2a,center2b,arrowCombination[Pairs[j][0]][index2][2],totalpenalty]]
                            ArrayToPush.push([center1a,center1b,arrowCombination[Pairs[j][1]][index1][2],center2a,center2b,arrowCombination[Pairs[j][1]][index2][2],totalpenalty])
                            
                            if(totalpenalty<=200){
                                if(j==0){
                                // console.log("ToPushIndex")
                                // console.log(index1,index2)
                                FirstPairSameOppTrueList.push(ArrayToPush)
                                }
                                if(j==1){
                                    SecondPairSameOppTrueList.push(ArrayToPush)
                                }
                                if(j==2){
                                    ThirdPairSameOppTrueList.push(ArrayToPush)
                                }
                            }
                            
                            }
                        }
                    }
                    }
                }
            }

            
            

        }
    }
    console.log("Done")


    
    // console.log(FirstPairSameTrueList)s
    // console.log(FirstPairBothTrueList)
    // console.log(SecondPairOppTrueList)
    // console.log(SecondPairSameTrueList)
    // console.log(SecondPairBothTrueList)
    // console.log(ThirdPairOppTrueList)
    // console.log(ThirdPairSameTrueList)
    // console.log(ThirdPairBothTrueList)


    function SortAndShortenPenaltiesList(list){
        if(list.length>0){

        
        // console.log("SORT")
        
        // console.log(list)
        list.sort((a, b) => a[0][6] - b[0][6])

        let newlist=[]
        let minnewlistlength=3
        for (let i=0;i<Math.min(list.length,minnewlistlength);i++){
            newlist.push(list[i])
        }
        //console.log(newlist)
        
        
        for (let i=3;i<list.length;i++){
           // console.log(newlist.length)
            if(newlist.length>2){
                // console.log("CHEKC")
                // console.log(newlist)
                // console.log(list)
                // console.log(newlist[2][0][6])
                // console.log(list[i][0][6])
                // console.log(newlist[2][0][6]==list[i][0][6])
                // console.log(6==12)
                if (newlist[2][0][6]==list[i][0][6]){
                newlist.push(list[i])
            }
            }
            
        }

        return newlist
    }
    }

    FirstPairOppTrueList=SortAndShortenPenaltiesList(FirstPairOppTrueList)
    FirstPairSameTrueList=SortAndShortenPenaltiesList(FirstPairSameTrueList)
    FirstPairBothTrueList=SortAndShortenPenaltiesList(FirstPairBothTrueList)
    SecondPairOppTrueList=SortAndShortenPenaltiesList(SecondPairOppTrueList)
    SecondPairSameTrueList=SortAndShortenPenaltiesList(SecondPairSameTrueList)
    SecondPairBothTrueList=SortAndShortenPenaltiesList(SecondPairBothTrueList)
    ThirdPairOppTrueList=SortAndShortenPenaltiesList(ThirdPairOppTrueList)
    ThirdPairSameTrueList=SortAndShortenPenaltiesList(ThirdPairSameTrueList)
    ThirdPairBothTrueList=SortAndShortenPenaltiesList(ThirdPairBothTrueList)
    
    
    if(FirstPairSameOppTrueList.length==0){
        console.log("COoked")
        console.log(algRef.current)
    }
    if(SecondPairSameOppTrueList.length==0){
        console.log("COoked")
        console.log(algRef.current)
    }
    if(ThirdPairSameOppTrueList.length==0){
        console.log("COoked")
        console.log(algRef.current)
    }


    FirstPairSameOppTrueList=SortAndShortenPenaltiesList(FirstPairSameOppTrueList)
    SecondPairSameOppTrueList=SortAndShortenPenaltiesList(SecondPairSameOppTrueList)
    ThirdPairSameOppTrueList=SortAndShortenPenaltiesList(ThirdPairSameOppTrueList)
    
    

   



    // if(ThirdPairBothTrueList.length>0||SecondPairBothTrueList.length>0||FirstPairBothTrueList.length>0){
    //     console.log("BothTRUUEUEU")
    // }
    // if(ThirdPairSameTrueList.length>0||SecondPairSameTrueList.length>0||FirstPairSameTrueList.length>0){
    //     console.log(`SameTRUUEUEU,${FirstPairSameTrueList},${SecondPairSameTrueList},${ThirdPairSameTrueList}`)
    // }
    // console.log()
    // console.log()
    // console.log()
    // console.log()
    // console.log()
    // console.log()
    //console.log(`OllName: ${algRef.current},${ollCaseSet.cases[algRef.current].name} `)
    //console.log(FirstPairOppTrueList)
    // console.log()
    // console.log()
    // console.log()
    // console.log()
    // console.log()
    // console.log()
    
    console.log(`Algref, ${algIndexRef.current}`)
    console.log(algRef.current)
    
    

    

    groupdict ={
        name:ollCaseSet.cases[algRef.current].name,
        algNumber:algIndexRef.current,
        altAUF:AUF,
        barMovements:barMovements,
        algs:ollCaseSet.cases[algRef.current].algs[algIndexRef.current],
        group:ollCaseSet.cases[algRef.current].group,
        // fullDiagCp:[...FirstPairOppTrueList,FirstPairSameTrueList,FirstPairBothTrueList],
        // leftRightCp:[...SecondPairOppTrueList,SecondPairSameTrueList,SecondPairBothTrueList],
        // frontBackCp:[...ThirdPairOppTrueList,ThirdPairSameTrueList,ThirdPairBothTrueList],
    
        fullDiagCp:[[...FirstPairOppTrueList][0]],
        leftRightCp:[[...SecondPairOppTrueList][0]],
        frontBackCp:[[...ThirdPairOppTrueList][0]],
        SameOpp:[[FirstPairSameOppTrueList[0]],[SecondPairSameOppTrueList[0]],[ThirdPairSameOppTrueList[0]]]
    
    }
    //setJsonArrowsToExport(prev=>[...prev,groupdict])
    
    //Groupdict will be added in EasyRecognition Function
    console.log(`AlgRefValue, ${algRef.current}`)
    //if(algRef.current+1<ollCaseSet.cases.length){

    // if(algRef.current+1<3){
    //     algRef.current+=1
    //     console.log(`Through, ${algRef.current}`)
    //     console.log()

   
    // scrambleIndex.current=0
    // setPathArrowList([]);
    // setAngleList([]);
    // setCenterPathList([]);
    // setCenterPath2List([]);
    // setCenterxList([]);
    // setCenterx2List([]);
    // setCenteryList([]);
    // setCentery2List([]);
    // setSquaresColors([]);
    // setArrowCombination([]);
    // setArrowColor([]);
    // setArrowCombinationSorted(false);
    // setArrowDone(false);

    // setScramble(ollCaseSet.cases[algRef.current].algs[algIndexRef.current])
    //  }

    //Clean Up and Next scramble generated at easyrecognition

    //  if(algRef.current+1==ollCaseSet.cases.length){
  
    //     console.log(`CopyToExport`,JSON.stringify(jsonArrowsToExport, null, 2))
    //     console.dir(jsonArrowsToExport, { depth: null });
    // }
    // Arrow(FirstPairOppTrueList[0][1][0],FirstPairOppTrueList[0][1][1],"blue")
    // Arrow(FirstPairOppTrueList[0][1][3],FirstPairOppTrueList[0][1][4],"red")
    //Arrow(6,16,"red")
    
}

useEffect(() => {
    console.log("Print Json")
    console.log(algRef.current)
    console.log(jsonArrowsToExport)
  if (algRef.current+1 === ollCaseSet.cases.length) {
    console.log("Print Json")
    console.log(algRef.current)
    
    const groupTable = {
    "Cross": 0,
    "Dot": 1,
    "T Shape": 2,
    "C Shape": 3,
    "I Shape": 4,
    "P Shape": 5,
    "W Shape": 6,
    "Small L Shape": 7,
    "Small Lightning Bolt": 8,
    "Big Lightning Bolt": 9,
    "Square Shape": 10,
    "Fish Shape": 11,
    "Knight Move Shape": 12,
    "Awkward Shape": 13,
    "Corners Oriented": 14,
    }
    let groupedArray =Array.from({length:15},()=>[])
        
    jsonArrowsToExport.forEach((OllAlg)=>{    
        // console.log("GroupedArray")
        // console.log(groupedArray)
        // console.log(OllAlg)
        // console.log("TestingGroupTable")
        // console.log(groupedArray)
        // console.log(OllAlg.group)
        // console.log(groupTable[OllAlg.group])
        groupedArray[groupTable[OllAlg.group]].push(OllAlg)
        groupedArray.forEach(group => group.sort((a,b)=>parseInt(a.group.split(" ")[1])-parseInt(b.group.split(" ")[1])))
        //console.log(groupedArray)
    })
    
    //console.log(JSON.stringify(groupedArray, null, 2).replace(/"([^"]+)":/g, '$1:'));
    
    //Important!
    console.log(
    "const arrowOllSet = " +
    JSON.stringify(groupedArray, null, 2)
        .replace(/"([^"]+)":/g, '$1:') + 
    ";\n\nexport default arrowOllSet;"
    );

  }

}, [jsonArrowsToExport]);


useEffect(()=>{
    console.log("Doesnt go")
    console.log(arrowCombination)
    console.log(arrowCombination.length)

    if(arrowCombinationSorted==true){
    if (arrowCombination.length==6){//First Arrow Indices
        console.log(`ArrowCombinationLength is ${arrowCombination.length}`)
        
        GroupRecognition()
        EasyRecognition()
    }}
   

    
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
const altoverlayRefs = useRef(Array.from({ length: 4}, () => null));



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

   

    let tempBarMovement=[]
    for(let i=0;i<4;i++){
        console.log(altoverlayRefs)
    const containerParent = altoverlayRefs.current[i];
    let altContainer= containerParent.querySelector("div")
    let altContainerSvg= altContainer.querySelector("svg")
    let altContainerSvgSquaresInside= altContainerSvg.querySelectorAll("g")[1]
    let altContainerSvgSquaresInsideList= altContainerSvgSquaresInside.querySelectorAll("polygon")
    //console.log(containerSvgSquaresInsideList)
     let altContainerSvgSquaresOutside= altContainerSvg.querySelectorAll("g")[2]
     let altContainerSvgSquaresOutsideList= altContainerSvgSquaresOutside.querySelectorAll("polygon")
    
    
   let containsOnlyYellow=true
    
//    console.log(altContainer)
//    console.log(altContainerSvg)
//    console.log(altContainerSvgSquaresInside)
//    console.log(altContainerSvgSquaresInsideList)
    //console.log(`Index: ${i}`)
    

    
     altContainerSvgSquaresInsideList.forEach((item)=>{
        if(item.getAttribute("fill")=="yellow"){
            
        }
        else{
            //console.log(`Not Yellow, ${item.getAttribute("fill")}`)
            containsOnlyYellow=false
        }
        
     })
     if(containsOnlyYellow){
        console.log()
        console.log()
        console.log()
        console.log()
        console.log(`Index: ${i}`)
        if(scrambleIndex.current==0){

        
        let aufIndex=i
        if(aufIndex==1){
            aufIndex=2
        }
        else if(aufIndex==2){
            aufIndex=1
        }
        console.log("CHangeAUF")
        setAUF(prev=>[...prev,allAUF[aufIndex]])
    }
        
        function getHeadlights(svgSquaresOutsideList){
            console.log("SVGOutside")
           
            let LeftTrue=false
            let RightTrue=false
            let FrontTrue=false
            let BackTrue=false
            if(svgSquaresOutsideList[0].getAttribute("fill")==svgSquaresOutsideList[2].getAttribute("fill")){
                RightTrue=true
            }
            if(svgSquaresOutsideList[3].getAttribute("fill")==svgSquaresOutsideList[5].getAttribute("fill")){
                FrontTrue=true
            }
            if(svgSquaresOutsideList[6].getAttribute("fill")==svgSquaresOutsideList[8].getAttribute("fill")){
                LeftTrue=true
            }
            if(svgSquaresOutsideList[9].getAttribute("fill")==svgSquaresOutsideList[11].getAttribute("fill")){
                BackTrue=true
            }
            let ReturnedValue=""
            if(RightTrue&&FrontTrue){
                ReturnedValue="Full"
            }
            else if(LeftTrue){
                ReturnedValue="Left"
            }
            else if(RightTrue){
                ReturnedValue="Right"
            }
            else if(FrontTrue){
                ReturnedValue="Front"
            }
            else if(BackTrue){
               ReturnedValue="Back"
            }
            else{
                ReturnedValue="Diag"
            }
            console.log(ReturnedValue)
            return ReturnedValue
        }
         
        // for(let i=0;i<barMovements.length;i++){
        //     tempBarMovement[i]=barMovements[i]
        // }
        // tempBarMovement[scrambleIndex.current].push(getHeadlights(altContainerSvgSquaresOutsideList))
        // setBarMovements(tempBarMovement)
        // console.log(`ScrambleIndex: ${scrambleIndex.current}`)
        // console.log(`THe problem:, ${JSON.stringify(tempBarMovement)}`)
        tempBarMovement.push(getHeadlights(altContainerSvgSquaresOutsideList))
        // setBarMovements(tempBarMovement)
        // console.log(`ScrambleIndex: ${scrambleIndex.current}`)
        // console.log(`THe problem:, ${JSON.stringify(tempBarMovement)}`)

    }
    
    }
    console.log()
    console.log()
    console.log()
    console.log()
    console.log()

    console.log("Adding temp")
     console.log(tempBarMovement)
    

    setBarMovements(prev => (
            [...prev,[...tempBarMovement]]
    ));


    console.log("SquareColors")
    console.log(newSquaresColors)
    
    flushSync(() => {
    setSquaresColors(newSquaresColors)
    })

     


    //Get effect of alt overlay algs
    
}


//console.log(squaresColors)


let colorCombinations=[["red","orange"],["#1f51ff","#00d800"],["orange","red"],["#00d800","#1f51ff"]]

function getPossibleArrows(){
    console.log("Getposarrows")
    console.log(squaresColors)
    console.log(scrambleIndex.current)
    if (squaresColors.length === 0) return;
    if (scrambleIndex.current==6) return;
    let Priority = [16,18,6,8,23,21,19,9,15];
    //let Priority=[6,8,16,18]
    let NewPriority=[]
    let tempArrowCombination=[]

    console.log(squaresColors)
    Priority.forEach(index => {
      if (squaresColors[index] !== "yellow") {
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
        
        if (squaresColors[index] == colorCombinations[colorindex][0]) {
            //console.log("NewIndex")
            //console.log(index)
            for (let j = 0; j < NewPriority.length; j++) {
                let leftSideUsed=false
                let rightSideUsed=false

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
                    let arrowlength=(xdifference**2+ydifference**2)**(1/2)
                    let penalty=0
                    if(index==21){
                        penalty+=5
                    }
                    if(index==9){
                        penalty+=30
                    }
                    if(index==15){
                        penalty+=40
                    }
                    if(index==19){
                        penalty+=10
                    }
                    if(index2==21){
                        penalty+=5
                    }
                    if(index2==9){
                        penalty+=30
                    }
                    if(index2==15){
                        penalty+=40
                    }
                    if(index2==19){
                        penalty+=10
                    }
                    if(85<arrowlength &&arrowlength<=110){
                        penalty+=3
                    }
                    if(110<arrowlength>0&&arrowlength<=125){
                        penalty+=6
                    }
                    if(125<arrowlength){
                        penalty+=10
                    }
                    
                    


                if (squaresColors[index2] == colorCombinations[colorindex][1]) {
                    tempArrowCombination.push([index, index2,"opp",penalty]);
                }
                else if (squaresColors[index2] == colorCombinations[colorindex][0]) {
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
    
        <div className='CpRecContainer' ref={overlayRef}>
              <CaseImage
                size={200}
                //alg={""+scramble2.replace(/\s+/g, "")+"y2"}
                   alg={scramble.replace(/\s+/g, "")+"y2"}
                caseSetDetails={ScrambleVisualizerDetails}
                co="40"
            ></CaseImage>
            <div className='CpRecOverlay' style={{marginTop:"0px"}}>
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
                                    //transform={`rotate(${angleList[i]} ${centerx2List[i]+1.25} ${centery2List[i]})`}
                                    //transform={`rotate(${-60} ${38} ${120.25})`}
                                    transform={`rotate(${180} ${centerx2List[i]+1} ${centery2List[i]})`}
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
                <svg style={{position:"absolute"}}id="GoodLine" width="100%" height="100%">
                    <path
                        d={centerPathList[0]}
                        fill="rgba(0, 255, 21, 1)"
                        stroke="rgba(0, 0, 0, 1)"
                        strokeWidth="0"
                        
                    />
                </svg>
                <svg style={{position:"absolute"}}id="GoodLine" width="100%" height="100%">
                    <path
                        d={centerPath2List[0]}
                        fill="rgba(0, 255, 26, 1)"
                        stroke="rgba(0, 0, 0, 1)"
                        strokeWidth="0"
                        
                    />
                </svg>
            </div>
            <div className='CpGridOverlay' style={{marginTop:"0px"}}>
                
            </div>
        </div>




        {altoverlayRefs.current.map((_,i)=>(

        
        <div className='CpRecContainer' ref={el => altoverlayRefs.current[i]=el}>
              <CaseImage
                size={200}
                //alg={""+scramble2.replace(/\s+/g, "")+"y2"}
                   alg={altscramble[i].replace(/\s+/g, "")+"y2"}
                caseSetDetails={ScrambleVisualizerDetails}
                co="40"
            ></CaseImage>
            <div className='CpGridOverlay' style={{marginTop:"0px"}}>
            </div>
        </div>
        ))}
        </>
        
    )

}

export default CornerPermutationPage