
import arrowOllSet from "./data/arrowOllSet.js";
//import arrowOllSet from "./data/arrowOllSet copy.js"
import { ThemeContext } from './DarkThemeContext.jsx';
import React, { use, useContext,useRef, useEffect, useState, useLayoutEffect } from "react";
import "./index.css"
import { FaIcon } from './fontAwesome.js';
import CaseImage from "./cubing/cubeImage.jsx";
import ollCaseSet from "./data/ollCaseSet.js";
import { TbRuler } from "react-icons/tb";
import { range } from "lodash";
import { SiTrueup } from "react-icons/si";

import { db } from './data/db.js';

import { useLiveQuery } from "dexie-react-hooks";
import {CornerPermutationPage} from "./ArrowDataGenerator.jsx"


export function useWindowWidthLogic(setCubeSize,setStrokeWidth,setLineWidth,setRefsReady) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (width < 600) {
      setCubeSize(120);
      setStrokeWidth(1);
      setLineWidth(3);
    } else if (width < 900) {
      setCubeSize(150);
      setStrokeWidth(1.2);
      setLineWidth(3.5);
    } else if (width < 1100) {
      setCubeSize(200);
      setStrokeWidth(1.5);
      setLineWidth(4);
    } else if (width < 1500) {
      setCubeSize(150);
      setStrokeWidth(1.2);
      setLineWidth(3.5);
    } else {
      setCubeSize(200);
      setStrokeWidth(1.5);
      setLineWidth(4);
    }

    setRefsReady(false)
  }, [width]);

  return {};
}

export function GetCentersPosition(cubeSize){

    //Cubesizes ranging from 100 to 400, incremented by 50, manually verified on my laptop
    let EmpericalcoordOffset=[[5.3,0.5],[5.3,0],[5.3,-0.5],[5.3,-0.9],[6,-0.9],[6,-1.5],[6,-2.2]]
    
    let BetweenArray=[Math.floor((cubeSize-100)/50),Math.ceil((cubeSize-100)/50)]

    let LowerEnd=BetweenArray[0]
    let UpperEnd=BetweenArray[1]

    console.log(cubeSize)
    if(LowerEnd<0){
      LowerEnd=0
      UpperEnd=0
    }
    if(LowerEnd>=EmpericalcoordOffset.length-1 ||UpperEnd>=EmpericalcoordOffset.length-1){
      LowerEnd=EmpericalcoordOffset.length-1
      UpperEnd=EmpericalcoordOffset.length-1
    }

    let xCoordOffset=EmpericalcoordOffset[LowerEnd][0]*(1-(cubeSize%50)/50)+EmpericalcoordOffset[UpperEnd][0]*(cubeSize%50)/50
    let yCoordOffset=EmpericalcoordOffset[LowerEnd][1]*(1-(cubeSize%50)/50)+EmpericalcoordOffset[UpperEnd][1]*(cubeSize%50)/50

    const xCoords = [9, 39, 79.5, 120,150];
    const yCoords = [10.5, 40, 81.5, 122.5, 153.5];

    let Centers = [];

    for (let y of yCoords) {
        for (let x of xCoords) {
            Centers.push([x*(cubeSize/200)+xCoordOffset, y*(cubeSize/200)+yCoordOffset]);
        }
    }
    return Centers

}

export function getCubeColors(altoverlayRefs,OllIndex,PermIndex){
    let containerparent = altoverlayRefs.current[OllIndex][PermIndex];
  
    if (!containerparent) {
      console.warn('GetBarsIndices: no ref for index', PermIndex);
      return ["","red"]
    }
    let container= containerparent.querySelector("div")
    let ContainerSvg = container.querySelector('svg');
  if (!ContainerSvg) {
    console.warn('GetBarsIndices: no svg inside container', container);
    return ["","red"]
  }
  let ContainerSvgSquaresInside= ContainerSvg.querySelectorAll("g")[1]
  let ContainerSvgSquaresInsideList= ContainerSvgSquaresInside.querySelectorAll("polygon")

  let ContainerSvgSquaresOutside= ContainerSvg.querySelectorAll("g")[2]
  
  let ContainerSvgSquaresOutsideList= ContainerSvgSquaresOutside.querySelectorAll("polygon")
  let combinedSquaresList=[...ContainerSvgSquaresInsideList,...ContainerSvgSquaresOutsideList]
  
  combinedSquaresList=[...combinedSquaresList,...[0,0,0,0]]

  let Remapping = [
      [0,6],[1,7],[2,8],[3,11],[4,12],
      [5,13],[6,16],[7,17],[8,18],[9,19],
      [10,14],[11,9],[12,21],[13,22],[14,23],
      [15,5],[16,10],[17,15],[18,3],[19,2],
      [20,1],[21,24],[22,20],[23,4],[24,0]
    ];
  
  //Store polygons as 5x5 grid
  let newCombinedSquaresList=Array.from( {length:25}, ()=> 0)
  combinedSquaresList.forEach((_,i)=>{
      newCombinedSquaresList[Remapping[i][1]]=combinedSquaresList[i]
  })

  //Put the color in newSquaresColors Array
  let newSquaresColors= Array.from( {length:25}, ()=> 0)
  newCombinedSquaresList.forEach((_,i)=>{
    if (newCombinedSquaresList[i]!=0){
        newSquaresColors[i]=newCombinedSquaresList[i].getAttribute("fill")
    }
    else{
        newSquaresColors[i]=0
    }
        
  })
  return {newSquaresColors,newCombinedSquaresList}
}

export function addInformationToColorIndexList(piecesMovementRef,newSquaresColors,newCombinedSquaresList,colorIndexList){
  
  for(let i=0;i<piecesMovementRef.current.length;i++){
      for(let j=0;j<piecesMovementRef.current[i].length;j++){
        
        let currentIndex=piecesMovementRef.current[i][j][0]
        let futureIndex=piecesMovementRef.current[i][j][1]

        let color = newSquaresColors[currentIndex]
        let Points=[]
        for(let j=0;j<4;j++){
          let tempPoints=newCombinedSquaresList[currentIndex].getAttribute("points").split(" ")
          Points.push(tempPoints[j].split(","))
          
        }
        colorIndexList[i].push([currentIndex,futureIndex,color,Points])
      }
    }
  return colorIndexList
}



export function isPositionLeft(Center1,SquareColors){
      let PositionLeft=false
      if (Center1==1){
       if (SquareColors[6]=="yellow"){ //If it is position doesnt change
           PositionLeft=false
       }
       else{
        PositionLeft=true
      }
      }
     
      if(Center1==3){
         if (SquareColors[8]=="yellow"){ //If it is position doesnt change
          PositionLeft=true
        
      }
    }
    else if (Center1==5){
      if (SquareColors[6]=="yellow"){
        PositionLeft=true
      }
      else{
        PositionLeft=false
      }
    }
    else if (Center1==6){
      if (SquareColors[1]=="yellow"){
        PositionLeft=true
      }
    }
    else if (Center1==8){
      if (SquareColors[3]=="yellow"){
        PositionLeft=false
      }
      else{
        PositionLeft=true
      }
    }
    else if (Center1==9){{
      if (SquareColors[8]=="yellow"){
        PositionLeft=false
      }
      else{
        PositionLeft=true
      }
    }}

    else if (Center1==15){
      if (SquareColors[16]=="yellow"){
        PositionLeft=false
      }
      else{
        PositionLeft=true
      }
    }
    else if (Center1==16){
      if (SquareColors[21]=="yellow"){
        PositionLeft=false
      }
      else{
        PositionLeft=true
      }
    }
    else if (Center1==8){
      if (SquareColors[23]=="yellow"){
        PositionLeft=true
      }
      else{
        PositionLeft=false
      }
    }
    else if (Center1==19){{
      if (SquareColors[18]=="yellow"){
        PositionLeft=true
      }
    }}
    if (Center1==21){
      if (SquareColors[16]=="yellow"){
           PositionLeft=true
      }
    }
    if(Center1==23){
      if (SquareColors[18]=="yellow"){ 
           PositionLeft=false
      }
      else{
        PositionLeft=true
      }
    }
      return PositionLeft
  }


//Sorts colorIndexList on Center,PositionLeft,PositionRight
export function sortCenterLeftRight(index,SquareColors){
    let newIndex=index%10
    let returnedvalue=0
    if(newIndex<5){
      if(newIndex%2==0){
        return returnedvalue
      }
    }
    else if (newIndex==7){
      return returnedvalue
    }
    if (index==11 || index==13){
      return returnedvalue
    }

    let PositionLeft=isPositionLeft(index,SquareColors)
    if(PositionLeft){
      returnedvalue=1
    }
    else{
      returnedvalue=2
    }
    return returnedvalue
  }


export function sortPointsList(list){
  list.forEach(pointList=>{
        let averagex=0
        pointList[3].forEach(item=>{
          
          averagex+=item[0]/4
        })
        let averagey=0
        pointList[3].forEach(item=>{
          averagey+=item[1]/4
        })
        
        //Store topleft topright bottom right bottomleft
        let indextostore=[]
        for(let i=0;i<4;i++){
          let [x,y]=pointList[3][i]
          
          if(y<averagey &&x<averagex){
            indextostore[i]=0
          }
          if(y<averagey &&x>averagex){
            indextostore[i]=1
          }
          if(y>averagey &&x>averagex){
            indextostore[i]=2
          }
          if(y>averagey &&x<averagex){
            indextostore[i]=3
          }
        }
        let TempPointsList=[...pointList[3]]
        for(let i=0;i<4;i++){
          pointList[3][indextostore[i]]=TempPointsList[i]
        }
      })
    return list
}

export function piecesMovement(){

}