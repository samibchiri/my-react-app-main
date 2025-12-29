
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

import {useWindowWidthLogic,GetCentersPosition,addInformationToColorIndexList,getCubeColors,sortPointsList,sortCenterLeftRight,isPositionLeft} from "./BarPersevationLogic.jsx"

export function BarPersevation({algGroup,testedAlgs,setButtonClicked,setCaseClicked}){



  const [groupSelected,setGroupSelected]=useState(7)

  const [cubeSize, setCubeSize] = useState(200);
  const [strokeWidth, setStrokeWidth] = useState(1.5);
  const [lineWidth, setLineWidth] = useState(4);
  const [refsReady, setRefsReady] = useState(false);

  const altoverlayRefs = useRef([]);

  const [changedAlgArray,setChangedAlgArray]=useState(["","",false])
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

  
const allOlls = useLiveQuery(() => db.olls.toArray(), []);

console.log(allOlls)
const selectedGroupOlls = useLiveQuery(
  () => db.olls.where("group").equals(groupTable[groupSelected]).toArray(),
  [groupSelected]
);


useEffect(() => {
  altoverlayRefs.current = [];
  setRefsReady(false);
}, [selectedGroupOlls]);

  const [pathCalculated,setPathCalculated]= useState(false)
  const [overlayPaths, setOverlayPaths] = useState([]); // <-- new: store [path,color] per ref
  
  const [barColorsFiltered,setBarColorsFiltered]=useState([])

const noMovementCenterRef = useRef(
  Array.from({ length: 25 }, () => [false, false])  // 25 separate [false, false] arrays
);


useWindowWidthLogic(setCubeSize,setStrokeWidth,setLineWidth,setRefsReady);



const Scale=13.1/0.15740740740740744/150*cubeSize

  const piecesMovementRef = useRef([]) // mirror for immediate reads

  let T_Perm="R U R' U' R' F R2 U' R' U' R U R' F'"
  let Y_Perm="F R U' R' U' R U R' F' R U R' U' R' F R F'"
  let F_Perm="R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R"


  let CornerPermutations=["",T_Perm, "U2"+F_Perm   ,"U"+F_Perm,"U'"+F_Perm,Y_Perm]
  //let CornerPermutations=["","", "","","",""]
  let PermTable=[0,5,1,2,3,4]

  let CpLocation=["Full","Diag","Left","Right","Front","Back"]
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
let Centers= GetCentersPosition(cubeSize)


function GetBarsIndices(OllIndex,PermIndex){

  console.log("GetAgainBar")

  let {newSquaresColors,newCombinedSquaresList}= getCubeColors(altoverlayRefs,OllIndex,PermIndex)


  let colorIndexList=[[],[],[],[],[]]
  let colorList=["#00d800","orange","#1f51ff","red","yellow"]
  let contrastingcolorList=["rgba(13, 139, 13, 1)","rgba(255, 128, 1, 1)","rgba(0, 71, 204, 1)","rgba(207, 1, 1, 1)","yellow"]

  if(PermIndex==0){
    for(let i=0;i<newSquaresColors.length;i++){
      if(newSquaresColors[i]!=0){
        let index= colorList.findIndex(x=> x==newSquaresColors[i])
        let Points=[]
        
        for(let j=0;j<4;j++){
          let tempPoints=newCombinedSquaresList[i].getAttribute("points").split(" ")
          Points.push(tempPoints[j].split(","))
          
        }
        
        colorIndexList[index].push([i,"","",Points])
      }
    }
  }
  //Put information of each piece in colorIndexList
  //Every array in colorIndexList forms a side after doing OLL
  else{
    //each colorIndexList[i,j]= [currentIndex,futureIndex,color,Points]
    colorIndexList=addInformationToColorIndexList(piecesMovementRef,newSquaresColors,newCombinedSquaresList,colorIndexList)
  }

   colorIndexList.forEach(list=>{
      list.sort((a,b)=>(sortCenterLeftRight(a[0],newSquaresColors)-sortCenterLeftRight(b[0],newSquaresColors)))

      //Sort Points clockwise
      list=sortPointsList(list)
    } 
  )

  let ConnectingLines = Array.from({ length: 5 }, () =>(
    {
      connectCenters:[],
      arrow:{
        arrowPath:"",
        arrowRotation:"",
        arrowRotationCoordX:"",
        arrowRotationCoordX:""
      },
      centerCircle:""
    })
  );
  let combinedColorList=Array.from({ length: 5 }, () => [])
  
  for(let i=0;i<4;i++){
      let distance
      let color
      let contrastingcolor
      let maxdistance=((Centers[6][0]-Centers[12][0])**2+(Centers[6][1]-Centers[12][1])**2)**(1/2)+1;
      
      //Bars can be connected if they are close to each other, 
      //or always if maxdistance is multiplied by a large number
      //Bars with hard to see pieces can be excluded with difficultCenters Array
      maxdistance=maxdistance*10
      if(colorIndexList[i][0][2]!=colorIndexList[i][1][2]){
        distance=10000
      }
      else if(selectedGroupOlls[OllIndex].difficultCenters.includes(colorIndexList[i][0][0])|| selectedGroupOlls[OllIndex].difficultCenters.includes(colorIndexList[i][1][0])){
        distance=10000
      }
      else{
        color=colorIndexList[i][0][2]
        //CombinedColorList contains the color and contrastcolor of each side, used for connecting centers and pointing arrows
        if(combinedColorList[i].length==0){
          let colorIndex=(colorList.findIndex(x=>x==color))
          combinedColorList[i].push(colorList[colorIndex],contrastingcolorList[colorIndex])
        }
        contrastingcolor=combinedColorList[i][1]
        //ConnectCenters returns [path,angle,centerx2,centery2,distance,circlePath1]
        if(barColorsFiltered.includes(color)){
          distance=10000
        }
        else{
          distance=ConnectCenters(colorIndexList[i],0,newSquaresColors,PermIndex,color)[4] 
        }
      }
      
      let circlePath=""
      let Center1Used=false
      let Center2Used=false
      let Center3Used=false

      if (distance<maxdistance){
      ConnectingLines[i][0]=ConnectCenters(colorIndexList[i],0,newSquaresColors,PermIndex,color)
      Center1Used=true
      }
      
      if(colorIndexList[i][0][2]!=colorIndexList[i][2][2]){
        distance=10000
      }
      else if(selectedGroupOlls[OllIndex].difficultCenters.includes(colorIndexList[i][0][0]) ||selectedGroupOlls[OllIndex].difficultCenters.includes(colorIndexList[i][2][0])){
        distance=10000
      }
      else{
        color=colorIndexList[i][0][2]
        if(combinedColorList[i].length==0){
          let colorIndex=(colorList.findIndex(x=>x==color))
          combinedColorList[i].push(colorList[colorIndex],contrastingcolorList[colorIndex])
        }
        contrastingcolor=combinedColorList[i][1]
        distance=ConnectCenters(colorIndexList[i],1,newSquaresColors,PermIndex,color)[4]
        if(barColorsFiltered.includes(color)){
          distance=10000
        }
      }

      if (distance<maxdistance){
      ConnectingLines[i][1]=ConnectCenters(colorIndexList[i],1,newSquaresColors,PermIndex,color)
      if (Center1Used){
        circlePath=ConnectingLines[i][1][5]
      }
      Center2Used=true
      }

  if (!Center1Used && !Center2Used){
      if(colorIndexList[i][1][2]!=colorIndexList[i][2][2]){
        distance=10000
      }
      else if(selectedGroupOlls[OllIndex].difficultCenters.includes(colorIndexList[i][1][0])||selectedGroupOlls[OllIndex].difficultCenters.includes(colorIndexList[i][2][0])){
        distance=10000
      }
      else{
        color=colorIndexList[i][1][2]
        if(combinedColorList[i].length==0){
          let colorIndex=(colorList.findIndex(x=>x==color))
          combinedColorList[i].push(colorList[colorIndex],contrastingcolorList[colorIndex])
        }
        contrastingcolor=combinedColorList[i][1]
        distance=ConnectCenters(colorIndexList[i],2,newSquaresColors,PermIndex,color)[4]
        if(barColorsFiltered.includes(color)){
          distance=10000
        }
      }
      if (distance<maxdistance){
        
          ConnectingLines[i][1]=ConnectCenters(colorIndexList[i],2,newSquaresColors,PermIndex,color)
          Center3Used=true
      }
    }
      
      ConnectingLines[i][2]=circlePath
      ConnectingLines[i][3]=ArrowBarMovement(contrastingcolorList,colorIndexList[i],Center1Used,Center2Used,Center3Used,contrastingcolorList[i],newSquaresColors,PermIndex)
      
      for(let j=0;j<3;j++){
        let currentIndex=colorIndexList[i][j][0]
        let NewIndex=ConnectingLines[i][3][4+j]  //j=0 is center, j=1/2 are left/right centers
         
        let distance=((Centers[currentIndex][0]-Centers[NewIndex][0])**2+(Centers[currentIndex][1]-Centers[NewIndex][1])**2)**(1/2)+1;
        let smalldistance=Math.abs(Centers[6][0]-Centers[12][0])*1.3 //1.3 so that cornerpieces that are close to each other are also included
        let xdifference=(Centers[currentIndex][0]-Centers[NewIndex][0])
        let ydifference=(Centers[currentIndex][1]-Centers[NewIndex][1])
        
      if(PermIndex==0){
      if(distance<smalldistance){ 
        if(xdifference>1){
          noMovementCenterRef.current[currentIndex][0]=-1
        }
        else if(xdifference<-1){
          noMovementCenterRef.current[currentIndex][0]=1
        }
        else{
          noMovementCenterRef.current[currentIndex][0]=0
        }
        if(ydifference>1){
          noMovementCenterRef.current[currentIndex][1]=1
        }
        else if(ydifference<-1){
          noMovementCenterRef.current[currentIndex][1]=-1
        }
        else{
          noMovementCenterRef.current[currentIndex][1]=0
        }
      }
      else{
        noMovementCenterRef.current[currentIndex][0]=false
        noMovementCenterRef.current[currentIndex][1]=false
      }
      }  
    }
  }
  
  let [pathList,color]= centerOutLineInfo(colorIndexList)

  color=newSquaresColors[PermIndex]
  color="rgba(13, 139, 13, 1)"

  //FinalPath stores the outline of centers,grouped by color of pllskip, later color is hardcoded as white ("rgba(248, 246, 246, 1)")
  let finalPath=[[],[],[],[]]
  let noMovementCenterCircle=[]
  for (let i=0;i<4;i++){
    for (let j=0;j<3;j++){
      let currentIndex=colorIndexList[i][j][0]
      let NewIndex=ConnectingLines[i][3][4+j]  //j=0 is center, j=1/2 are left/right centers
      if(noMovementCenterRef.current[currentIndex][0]!==false){
      finalPath[i]+=CalculateNewOutline(colorIndexList[i][j][3],strokeWidth,colorIndexList[i][j][0])
      finalPath[i]+=pathList[i][j]
      
      let changeX=noMovementCenterRef.current[currentIndex][0]
      let changeY=noMovementCenterRef.current[currentIndex][1]
      let circleX
      let circleY

      //[i][j][3] is array of point positions going from top left to top right to bottom right to bottom left
      if(changeX!==0 ||changeY!==0){
        if(changeX===0 &&changeY===1){
          circleX=colorIndexList[i][j][3][0][0]/2+colorIndexList[i][j][3][1][0]/2
          circleY=colorIndexList[i][j][3][1][1]
        }
        if(changeX==1 &&changeY==1){
          circleX=colorIndexList[i][j][3][1][0]
          circleY=colorIndexList[i][j][3][1][1]
          
        }
        if(changeX==1 &&changeY==0){
          circleX=colorIndexList[i][j][3][1][0]
          circleY=colorIndexList[i][j][3][1][1]/2+colorIndexList[i][j][3][2][1]/2
        }
        if(changeX==1 &&changeY==-1){
          
          circleX=colorIndexList[i][j][3][2][0]
          circleY=colorIndexList[i][j][3][2][1]

        }
        if(changeX==0 &&changeY==-1){
          circleX=colorIndexList[i][j][3][2][0]/2+colorIndexList[i][j][3][3][0]/2
          circleY=colorIndexList[i][j][3][2][1]
        }
        if(changeX==-1 &&changeY==1){
          circleX=colorIndexList[i][j][3][0][0]
          circleY=colorIndexList[i][j][3][0][1]
        }
        if(changeX==-1 &&changeY==0){
          circleX=colorIndexList[i][j][3][3][0]
          circleY=colorIndexList[i][j][3][3][1]/2+colorIndexList[i][j][3][0][1]/2
        }
        if(changeX==-1 &&changeY==-1){
          circleX=colorIndexList[i][j][3][3][0]
          circleY=colorIndexList[i][j][3][3][1]
        }
      }
      
      let StartingPointx=Centers[12][0]
      let StartingPointy=Centers[12][1]
      
      circleX=StartingPointx+circleX*Scale
      circleY=StartingPointy+circleY*Scale

      if(colorIndexList[i][j][0]%5>=1 &&colorIndexList[i][j][0]%5<=3){
        if(colorIndexList[i][j][0]>=5 &&colorIndexList[i][j][1]<=18){
          if(noMovementCenterRef.current[currentIndex][1]==1){
            circleY+=0.2/cubeSize*200
          }
          else if(noMovementCenterRef.current[currentIndex][1]==-1){
            circleY-=0/cubeSize*200
          }
          if(noMovementCenterRef.current[currentIndex][0]==1){
            circleX-=1/cubeSize*200
          }
          if(noMovementCenterRef.current[currentIndex]==-1){
            circleX-=1.2/cubeSize*200
          }
        }
      }

      if(noMovementCenterRef.current[currentIndex][0]===0 &&noMovementCenterRef.current[currentIndex][1]===0 ){
        circleX=Centers[colorIndexList[i][j][0]][0]
        circleY=Centers[colorIndexList[i][j][0]][1]
        }

        if(changeX!=0 &&changeY!=0){
          circleX-=1*changeX/200*cubeSize
          circleY+=1*changeY/200*cubeSize
        }
      
        let radius=2/200*cubeSize
      let smallCirclePath=drawSmallCircle(circleX,circleY,radius)
      noMovementCenterCircle.push(smallCirclePath)
    }
    }
  }

  let stringNoMovementCircle=""
  console.log("NoMovementCircle",noMovementCenterCircle)
  for (let i=0;i<noMovementCenterCircle.length;i++){
    stringNoMovementCircle+=noMovementCenterCircle[i]
  }
  return [finalPath,colorList,ConnectingLines,stringNoMovementCircle,combinedColorList]

}

function drawSmallCircle(x,y,radius){
  let circlePath=`M ${x+radius},${y} A ${radius},${radius} 0 1 1 ${x-radius},${y} A ${radius},${radius} 0 1 1 ${x+radius},${y} Z `
 
  if(!(x>-1000)){
    return ""
  }
  return circlePath

}

function ArrowBarMovement(contrastingcolorList,PointsInfo,Center1Used,Center2Used,Center3Used,color,SquareColors,PermIndex){
  
  let Centers= GetCentersPosition(cubeSize)
  let StartLocationX
  let StartLocationY
  let Center1
  let Center2
  let EndLocationIndex

  function CenterNewPosition(PointsInfo,EndLocationIndex){

    Center1=PointsInfo[1][0]
    let NewCenter1
    let NewCenter2
    if (EndLocationIndex==2){
      NewCenter1=3
      NewCenter2=1
    }
    else if(EndLocationIndex==10){
      NewCenter1=5
      NewCenter2=15
    }
    else if (EndLocationIndex==22){
      NewCenter1=21
      NewCenter2=23
    }
    else if (EndLocationIndex==14){
      NewCenter1=19
      NewCenter2=9
    }
    return [NewCenter1,NewCenter2]
  }

  let contrastingcolorlistIndex
  if (color==contrastingcolorList[0]){
     EndLocationIndex=22
     contrastingcolorlistIndex=0
  }

  if (color==contrastingcolorList[1]){
     EndLocationIndex=14
     contrastingcolorlistIndex=1
  }

  if (color==contrastingcolorList[2]){
     EndLocationIndex=2
     contrastingcolorlistIndex=2
  }

  if (color==contrastingcolorList[3]){
    EndLocationIndex=10
    contrastingcolorlistIndex=3
  }
  [Center1,Center2]=CenterNewPosition(PointsInfo,EndLocationIndex,SquareColors)

  //Store where bar came from [prev,new] for all 3 pieces
  if(PermIndex==0){
    piecesMovementRef.current[contrastingcolorlistIndex]=[[PointsInfo[0][0],EndLocationIndex],[PointsInfo[1][0],Center1],[PointsInfo[2][0],Center2]]
  }

  let EndLocationX = Centers[EndLocationIndex][0]
  let EndLocationY = Centers[EndLocationIndex][1]

  if (Center1Used && Center2Used){
    StartLocationX=Centers[PointsInfo[0][0]][0]
    StartLocationY=Centers[PointsInfo[0][0]][1]
    EndLocationX = Centers[EndLocationIndex][0]
    EndLocationY = Centers[EndLocationIndex][1]
  }
  else if(Center1Used){
    StartLocationX=(Centers[PointsInfo[0][0]][0]+Centers[PointsInfo[1][0]][0])/2
    StartLocationY=(Centers[PointsInfo[0][0]][1]+Centers[PointsInfo[1][0]][1])/2
    EndLocationX += Centers[Center1][0]
    EndLocationY += Centers[Center1][1]

    EndLocationX=EndLocationX/2
    EndLocationY=EndLocationY/2
  }
   else if(Center2Used){
    StartLocationX=(Centers[PointsInfo[0][0]][0]+Centers[PointsInfo[2][0]][0])/2
    StartLocationY=(Centers[PointsInfo[0][0]][1]+Centers[PointsInfo[2][0]][1])/2
    EndLocationX += Centers[Center2][0]
    EndLocationY += Centers[Center2][1]

    EndLocationX=EndLocationX/2
    EndLocationY=EndLocationY/2
  }
  else if(Center3Used){
    StartLocationX=(Centers[PointsInfo[1][0]][0]+Centers[PointsInfo[2][0]][0])/2
    StartLocationY=(Centers[PointsInfo[1][0]][1]+Centers[PointsInfo[2][0]][1])/2
   
    EndLocationX = Centers[EndLocationIndex][0]
    EndLocationY = Centers[EndLocationIndex][1]
  }
  
  let [pathArrow2,angle,centerx2,centery2,distance]=Connect2Points(StartLocationX,StartLocationY,EndLocationX,EndLocationY,true);
  if(!Center1Used && !Center2Used && !Center3Used){
    pathArrow2=""
    angle=""
  }
  if(Math.abs(StartLocationX-EndLocationX)<1 &&Math.abs(StartLocationY-EndLocationY)<1){
     pathArrow2=""
  }
  return [pathArrow2,angle,centerx2,centery2,EndLocationIndex,Center1,Center2,color]
}

function Connect2Points(centerx,centery,centerx2,centery2,arrowTipBoolean){

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
    Correction+=180
}

angle+=Correction


let distance=((centerx-centerx2)**2+(centery-centery2)**2)**(1/2)
centerx=centerx2-((centerx-centerx2)**2+(centery-centery2)**2)**(1/2)                               
let pathArrow2=`M ${centerx-lineWidth/2},${centery2} Q ${centerx-lineWidth/2},${centery2-lineWidth/2} ${centerx},${centery2-lineWidth/2} L ${centerx},${centery2-lineWidth/2} L ${centerx2-lineWidth/2},${centery2-lineWidth/2}  Q ${centerx2},${centery2-lineWidth/2} ${centerx2},${centery2} L ${centerx2},${centery2}  Q ${centerx2},${centery2+lineWidth/2} ${centerx2-lineWidth/2},${centery2+lineWidth/2} L ${centerx2-lineWidth/2},${centery2+lineWidth/2} L ${centerx2-lineWidth/2},${centery2+lineWidth/2} L ${centerx+lineWidth/2},${centery2+lineWidth/2} Q ${centerx-lineWidth/2},${centery2+lineWidth/2} ${centerx-lineWidth/2},${centery2} Z`
    
if(arrowTipBoolean){
  pathArrow2=`M ${centerx-lineWidth/2},${centery2} Q ${centerx-lineWidth/2},${centery2-lineWidth/2} ${centerx},${centery2-lineWidth/2} L ${centerx},${centery2-lineWidth/2} L ${centerx2-2-lineWidth/2},${centery2-lineWidth/2} L ${centerx2-2-lineWidth/2},${centery2-3-lineWidth/2} L ${centerx2+2+lineWidth/2},${centery2} L ${centerx2-2-lineWidth/2},${centery2+3+lineWidth/2} L ${centerx2-2-lineWidth/2},${centery2+lineWidth/2} L ${centerx},${centery2+lineWidth/2} Q ${centerx-lineWidth/2},${centery2+lineWidth/2} ${centerx-lineWidth/2},${centery2} Z`
}
return [pathArrow2,angle,centerx2,centery2,distance]
}

function ConnectCenters(PointsInfo,CenterIndex,newSquaresColors,PermIndex,color){

  let PiecesIndex=[]
  for(let i=0; i<PointsInfo.length;i++){
    PiecesIndex.push(PointsInfo[i][0])
  }
  
  Centers=GetCentersPosition(cubeSize)

  let tempcenterx=Centers[PiecesIndex[(CenterIndex+1)%3]][0] //%3 So that no  error occurs 
  let tempcentery=Centers[PiecesIndex[(CenterIndex+1)%3]][1]
  let tempcenterx2=Centers[PiecesIndex[0]][0]
  let tempcentery2=Centers[PiecesIndex[0]][1]
  let [path,angle,centerx2,centery2,distance]= Connect2Points(tempcenterx,tempcentery,tempcenterx2,tempcentery2)
  
  if(CenterIndex==2){
     tempcenterx=Centers[PiecesIndex[1]][0] 
     tempcentery=Centers[PiecesIndex[1]][1]
     tempcenterx2=Centers[PiecesIndex[2]][0]
     tempcentery2=Centers[PiecesIndex[2]][1];
     [path,angle,centerx2,centery2,distance]= Connect2Points(tempcenterx,tempcentery,tempcenterx2,tempcentery2)
    
  }
  
  let circleRadius=3/200*cubeSize
  
  let midPointx1=Centers[PiecesIndex[0]][0]
  let midPointy1=Centers[PiecesIndex[0]][1]
  let circlePath1=`M ${midPointx1+circleRadius},${midPointy1} A ${circleRadius},${circleRadius} 0 1 1 ${midPointx1-circleRadius},${midPointy1}
                                                              A ${circleRadius},${circleRadius} 0 1 1 ${midPointx1+circleRadius},${midPointy1}`    
  return [path,angle,centerx2,centery2,distance,circlePath1]
}

//Calculate Outer Outline
function CalculateNewOutline(PointList,strokeWidth,index){

  //Alligns halfcenters with other centers (default was wider than normal)
  if(index%5==0||index%5==4){
    strokeWidth+=1
    
  }
   if(index%20<5){
    strokeWidth+=1
  }

  let Centers= GetCentersPosition(cubeSize)
  let StartingPointx=Centers[12][0]
  let StartingPointy=Centers[12][1]
  let newCoords=[]
  for(let i=0;i<4;i++){
    let [tempx,tempy]=PointList[i]
    tempx=StartingPointx+tempx*Scale
    tempy=StartingPointy+tempy*Scale
    newCoords[i]=[tempx,tempy]
  }
  
  let [x1,y1]=newCoords[0]
  let [x2,y2]=newCoords[1]
  let [x3,y3]=newCoords[2]
  let [x4,y4]=newCoords[3]

  let averagex=(x1+x2+x3+x4)/4
  let averagey=(y1+y2+y3+y4)/4

  let [slope1,c1]=CalculateSlope(x1,y1,x2,y2,strokeWidth,averagex,averagey)
  let [slope2,c2]=CalculateSlope(x2,y2,x3,y3,strokeWidth,averagex,averagey)
  let [slope3,c3]=CalculateSlope(x3,y3,x4,y4,strokeWidth,averagex,averagey)
  let [slope4,c4]=CalculateSlope(x4,y4,x1,y1,strokeWidth,averagex,averagey)

  newCoords[0]= CalculateNewCoordinates(c4,slope4,c1,slope1,x4,x1,strokeWidth,averagex)
  newCoords[1]= CalculateNewCoordinates(c1,slope1,c2,slope2,x1,x2,strokeWidth,averagex)
  newCoords[2]= CalculateNewCoordinates(c2,slope2,c3,slope3,x2,x3,strokeWidth,averagex)
  newCoords[3]= CalculateNewCoordinates(c3,slope3,c4,slope4,x3,x4,strokeWidth,averagex)

  let CentersOutlinePath=""
  let pointsPath=""
  for(let i=3;i>=0;i--){
    pointsPath+=" L "+ newCoords[i][0]+","+newCoords[i][1]+""
  }
  pointsPath+=" Z"
  CentersOutlinePath+=`M ${newCoords[3][0]},${newCoords[3][1]} ${pointsPath} `

  return CentersOutlinePath
}

function CalculateSlope(x1,y1,x2,y2,strokeWidth,averagex,averagey){

  //Solving y=ax+c going through (x1,y1) and (x2,y2)
  //Afterwards Move unit length * Strokwidth perpendicular to the slope, inwards
  let slope= (y2-y1)/(x2-x1)

  function normalizeVector(x, y) {
  const length = Math.sqrt(x*x + y*y);
  return [x / length, y / length];
}

  let newslope= -1/slope;
  let [x3,y3]=normalizeVector(1,newslope);

  if(x2==x1){
    x3=1
    y3=0
  }
  if(y1==y2){
    y3=1
    x3=0
  }

  x3=x3*strokeWidth
  y3=y3*strokeWidth

  let newx1= x1+x3
  let newy1= y1+y3

  if(Math.abs(newx1-averagex)>Math.abs(x1-averagex)){
    newx1= x1-x3
  }
  if(Math.abs(newy1-averagey)>Math.abs(y1-averagey)){
    newy1= y1-y3
  }

  newx1=parseFloat(newx1)
  newy1=parseFloat(newy1)
  slope=parseFloat(slope)

  let c=newy1-newx1*slope
  if(Math.abs(slope)=="Infnity"){
    c=0
  }
  return [slope,c]
}


function CalculateNewCoordinates(c1,slope1,c2,slope2,x1,x2,strokeWidth,averagex,outerCenterBoolean){

  let interceptx=(c2-c1)/(slope1-slope2)

  let tempStrokeWidth=1
  if(Math.abs(slope1)=="Infinity"){
    interceptx=x1+strokeWidth
    
    if(Math.abs(interceptx-averagex)>Math.abs(x1-averagex)){
      interceptx=x1-strokeWidth
    }
  }
  if(Math.abs(slope2)=="Infinity"){
    interceptx=x2+strokeWidth
    if(Math.abs(interceptx-averagex)>Math.abs(x1-averagex)){
      interceptx=x2-strokeWidth
    }
  }

  let y=interceptx*slope1+c1
  if(Math.abs(slope1)=="Infinity"){
    y=interceptx*slope2+c2
  }
  if(Math.abs(slope2)=="Infinity"){
    y=interceptx*slope1+c1
  }

  return [interceptx,y]
}

const setOverlayRef = (el,index)=> {
  const rowIndex = Math.floor(index / 6);
  const colIndex = index % 6;

  if (!altoverlayRefs.current[rowIndex]) {
    altoverlayRefs.current[rowIndex] = Array.from({length:6}, ()=> null);
  }

  altoverlayRefs.current[rowIndex][colIndex] = el;

  // Check if ALL refs are mounted
  const allMounted =
    altoverlayRefs.current.length > 0 
    &&
    altoverlayRefs.current.every(row =>{
      return row.every(item => item != null)
    }  
    );

  if (allMounted && (selectedGroupOlls?.length)) setRefsReady(true);
};

// compute overlayPaths after refs mount; run this AFTER refsReady becomes true
useLayoutEffect(() => {
  console.log("UpdatedCubesize")
  console.log("NewCubeSize",cubeSize)
  
  if (!refsReady) return;
  const paths = altoverlayRefs.current.map((algListRef, OllIndex) => {
    return algListRef.map((_,PermIndex)=>{

      try {
        const result = GetBarsIndices(OllIndex,PermIndex); 
        console.log("Resulting outcome",result,OllIndex,PermIndex)
        return result || ["","none"];
      } catch (err) {
        console.error('GetBarsIndices error for idx',OllIndex ,PermIndex, err)
        return ["","none"];
      }
    });
  })

  setOverlayPaths(paths);
  setPathCalculated(true);
}, [refsReady,selectedGroupOlls,cubeSize]);


//Calculate inner outline
function centerOutLineInfo(IndexList){
  
  let Centers= GetCentersPosition(cubeSize)
  let CenterIndex=12

  let Points=[[],[],[],[],[]]
  for (let j=0;j<4;j++){
    for (let i=0;i<IndexList[j].length;i++){
    Points[j].push([])
  }}

  let StartingPointx=Centers[12][0]
  let StartingPointy=Centers[12][1]

  for (let i=0;i<4;i++){ // Color
     for (let j=0;j<Points[i].length;j++){ //Center
    
    let TempPointsList=IndexList[i][j][3]
    let tempTempPointsList=[]
    for(let k=0;k<TempPointsList.length;k++){
      let xCoord=TempPointsList[k][0]
      let yCoord=TempPointsList[k][1]
      xCoord=StartingPointx+xCoord*Scale
      yCoord=StartingPointy+yCoord*Scale

      if(IndexList[i][j][0]%5>=1 &&IndexList[i][j][0]%5<=3){
        if(IndexList[i][j][0]>=5 &&IndexList[i][j][0]<=18){
          if(k==0){
            xCoord-=0.5
            yCoord-=0.5
          }
          if(k==1){
            xCoord+=0.5
            yCoord-=0.5
          }
          if(k==2){
            xCoord+=0.5
            yCoord+=0.5
          }
          if(k==3){
            xCoord-=0.5
            yCoord+=0.5
          }
       }
      }
      tempTempPointsList.push([xCoord,yCoord])
    }
    Points[i][j]=tempTempPointsList
    if(IndexList[i][j][0]%20<5||IndexList[i][j][0]%5==0||IndexList[i][j][0]%5==4){

  let [x1,y1]=tempTempPointsList[0]
  let [x2,y2]=tempTempPointsList[1]
  let [x3,y3]=tempTempPointsList[2]
  let [x4,y4]=tempTempPointsList[3]

  let averagex=(x1+x2+x3+x4)/4
  let averagey=(y1+y2+y3+y4)/4

  let tempstrokewidth=0.6
  let [slope1,c1]=CalculateSlope(x1,y1,x2,y2,tempstrokewidth,averagex,averagey)
  let [slope2,c2]=CalculateSlope(x2,y2,x3,y3,tempstrokewidth,averagex,averagey)
  let [slope3,c3]=CalculateSlope(x3,y3,x4,y4,tempstrokewidth,averagex,averagey)
  let [slope4,c4]=CalculateSlope(x4,y4,x1,y1,tempstrokewidth,averagex,averagey)

  tempTempPointsList[0]= CalculateNewCoordinates(c4,slope4,c1,slope1,x4,x1,tempstrokewidth,averagex)
  tempTempPointsList[1]= CalculateNewCoordinates(c1,slope1,c2,slope2,x1,x2,tempstrokewidth,averagex)
  tempTempPointsList[2]= CalculateNewCoordinates(c2,slope2,c3,slope3,x2,x3,tempstrokewidth,averagex)
  tempTempPointsList[3]= CalculateNewCoordinates(c3,slope3,c4,slope4,x3,x4,tempstrokewidth,averagex)
  Points[i][j]=tempTempPointsList
    }
  }    
  }

  let color="none"
  let CentersOutlinePath=[[],[],[],[],[]]
  let pointsPath=""
  for (let i=0;i< CentersOutlinePath.length; i++){
     for(let j=0;j<4;j++){ //Not including yellow
    CentersOutlinePath[i].push([])
     }
  }
  for(let k=0;k<5;k++){
  for(let i=0;i<Points[k].length;i++){
    pointsPath=""
    for(let j=1;j<4;j++){
      pointsPath+=" L "+ Points[k][i][j][0]+","+Points[k][i][j][1]+""
      if(Points[k][i][j][0]==undefined||Points[k][i][j][0]==undefined){
      }
    }
    pointsPath+=" Z"
    CentersOutlinePath[k][i]+=`M ${Points[k][i][0][0]},${Points[k][i][0][1]} ${pointsPath} `
  }}
  

  return [CentersOutlinePath,color]

}

function excludeCenters(e,OllIndex,oll){
  console.log(e)
  if(e.key=="Enter"){
      e.preventDefault()
      verifyAndUpdateExcludeBarInput(e.target.value,OllIndex,oll)
  }
    
}

function verifyAndUpdateExcludeBarInput(inputString,OllIndex,oll){
  console.log(oll,"Chanign")

  let testList=[]
  try{
    if(inputString.includes(",")){
      inputString=inputString.split(",")
      console.log(inputString)
      for(let i=0;i<inputString.length;i++){   
        if(inputString[i]!=""){
          let intInputString=parseInt(inputString[i])
          if (!isNaN(intInputString)){
            if(intInputString<0 || intInputString>=25){
              throw new Error(`Invalid number: ${inputString[i]}`)
            }
            else{
              testList.push(intInputString);
            }
          }
          else{
            throw new Error(`Invalid number: ${inputString[i]}`)
          }
        }
      }
    }
    else{
      if(inputString!=""){
        let intInputString=parseInt(inputString)
        if (!isNaN(intInputString)) {
          if(intInputString<0 || intInputString>=25){
              throw new Error(`Invalid number: ${inputString}`)
            }
            else{
              testList.push(intInputString);
            }
        }
        else{
          throw new Error(`Invalid number: ${inputString[i]}`)
        }
      }
      else{
        testList=[]
      }
    }
  }
  catch (error){
    console.error(error)
    document.getElementById(`barExcludeCenters-${OllIndex}`).value=selectedGroupOlls[OllIndex].difficultCenters
    
  }
  console.log(testList)

  const sortedOld = [...selectedGroupOlls[OllIndex].difficultCenters].sort((a,b) => a-b);
  const sortedNew = [...testList].sort((a,b) => a-b);

  console.log(sortedOld,sortedNew)
  const isDifferent = sortedOld.length !== sortedNew.length || 
                      sortedOld.some((val, idx) => val !== sortedNew[idx]);

  console.log(isDifferent)
  if (isDifferent) {
    console.log("Updating testList")
    updateDifficultCenters(oll,testList)
    
  }
}

async function updateDifficultCenters(oll,newDifficultCenters){
  let ollToChange= await db.olls.get(oll.id)
  console.log("UpdatedCool",oll.id,newDifficultCenters)
  if(!ollToChange){
    return
  }
  await db.olls.update(oll.id, {difficultCenters:newDifficultCenters})
  const updatedCount = await db.olls.update(oll.id, { difficultCenters: newDifficultCenters });
console.log("Rows updated:", updatedCount);
const updatedOll = await db.olls.get(oll.id);
console.log("Updated record:", updatedOll);
}


function changeOllAlgEnterPressed(e,oll){
  if(e.key=="Enter"){
      e.preventDefault()
      changeOllAlg(e.target.value,oll)
  }
    
}

function changeOllAlg(newAlg,oll){

  let updatedNewAlg= correctAlgString(newAlg)
  console.log("GivenData",[updatedNewAlg,oll])
  setChangedAlgArray([updatedNewAlg,oll,true])
}

function correctAlgString(inputstring){
  //Remove brackets () and []
  inputstring = inputstring.replace(/[()\[\]]/g, "");

  //Remove whitespace
  inputstring= inputstring.replace(/\s+/g, "");
  let newinputstring=""

  let oddSpacing=0
  for (let i=0; i<inputstring.length;i++){
    console.log(inputstring[i])
    newinputstring+=inputstring[i]

    if(inputstring[(i+1)%inputstring.length]!="'" &&inputstring[(i+1)%inputstring.length]!="2" ){
      newinputstring+=" "
    }

  }
  newinputstring=newinputstring.trim()
  return newinputstring

}


return (
  
  <>
  

  { (true && selectedGroupOlls?.length) && (
    <div className="BarOllGridsCont">

    {
    selectedGroupOlls.map((oll,i)=>(
      <>
                          {(
                          <div>

                          <h2>{(selectedGroupOlls[i].name==selectedGroupOlls[(i+1)%selectedGroupOlls.length].name||
                          
                          selectedGroupOlls[i].name==selectedGroupOlls[(i-1+selectedGroupOlls.length)%selectedGroupOlls.length].name)?
                          oll.name + " Version "+oll.algNumber:oll.name}</h2>
                          
                          
                          <div className="OllGrid">
                              
                              {CornerPermutations.map((_,j)=>{
                                if(i>=1){
                                  return
                                }

                              const refIndex = i * CornerPermutations.length + j;
                              const OllIndex=i
                              const PermIndex=j
                              return(
                                <>
                              <div className="RecCont"  ref={(el)=> setOverlayRef(el,refIndex)}> 
                              <h2 className="OllCpLocation">{CpLocation[j]}</h2>
                              
                              <CaseImage
                                  size={cubeSize}
                                  alg={(oll.algs+CornerPermutations[PermTable[j]]).replace(/\s+/g, "")+"y2"}
                                  caseSetDetails={ScrambleVisualizerDetails}
                                  co="40"
                              ></CaseImage>
                             
                              <div  className='CpRecOverlay' style={{height:`${cubeSize*160/200+10}px`,width:`${cubeSize*160/200+10}px`,marginTop:`${33+cubeSize/10}px`}}>

                               {
                                pathCalculated &&(
                               <>
                               
                                {
                                  //In this array to prevent outline from overlapping with connecting lines
                                  Array.from({ length: 5 }, (_, i) => i).map(i => (
                                  <>
                                  <svg style={{position:"absolute"}}id="GoodLine" width="100%" height="100%">
                                    
                                    <path
                                      d={overlayPaths[OllIndex][PermIndex]?.[0]?.[i] || ""}
                                      //fill={overlayPaths[OllIndex][PermIndex]?.[4]?.[i][1] || "black"}
                                      fill={"rgba(248, 246, 246, 1)"}
                                      fillRule="evenodd"
                                      stroke="rgba(44, 44, 44, 1)"
                                      strokeWidth="1"
                                      strokeLinejoin="round"
                                      filter="url(#shadow)"
                                    />
                                </svg>

                                <svg id="SmallCirclePath" style={{height:`${cubeSize*160/200+10}px`,width:`${cubeSize*160/200+10}px`,zIndex: "100",position:"absolute"}}>
      
                                  <path
                                      d={overlayPaths[OllIndex][PermIndex]?.[3]||""}
                                      fill={"black"}
                                      stroke="rgba(255, 255, 255, 1)"
                                      strokeWidth="0.5"
                                      strokeLinejoin="round"
                                      
                                  />
                                </svg>
                                </>
                                  ))}

                                  {
                                    Array.from({length:5},(_,i)=>i).map(i=>(
                                    <>
                                    {Array.from({ length: 2 }, (_, j) => j).map(j => (
                                  <>
                                  
                                  <svg style={{position:"absolute"}}id="ConnectingLines" width="100%" height="100%" >
                                    
                                    <path
                                      d={overlayPaths[OllIndex][PermIndex]?.[2]?.[i][j][0] || ""}
                                      fill={overlayPaths[OllIndex][PermIndex]?.[4]?.[i][0] || "black"}
                                      
                                      stroke="rgba(44, 44, 44, 1)"
                                      strokeWidth="1"
                                      strokeLinejoin="round"
                                      
                                      
                                      transform={`rotate(${overlayPaths[OllIndex][PermIndex]?.[2]?.[i][j][1] || "0"} ${overlayPaths[OllIndex][PermIndex]?.[2]?.[i][j][2] ||"0"} ${overlayPaths[OllIndex][PermIndex]?.[2]?.[i][j][3] ||"0"})`}
                                    />
                                    
                                </svg>
                                </>
                                ))} 
                                </>
                                ))
                                  }
                                  {
                                  
                                Array.from({ length: 5 }, (_, i) => i).map(i => (
                                  <>                             
                                    <svg style={{position:"absolute"}}id="PointingArrow" width="100%" height="100%" >
                                  <path
                                      d={overlayPaths[OllIndex][PermIndex]?.[2]?.[i][3][0]||""}
                                      fill={overlayPaths[OllIndex][PermIndex]?.[4]?.[i][1] || "purple"}
                                    stroke="rgba(0, 0, 0, 1)"
                                      strokeWidth="1.5"
                                      strokeLinejoin="round"
                                      transform={`rotate(${overlayPaths[OllIndex][PermIndex]?.[2]?.[i][3][1] || "0"} ${overlayPaths[OllIndex][PermIndex]?.[2]?.[i][3][2] ||"0"} ${overlayPaths[OllIndex][PermIndex]?.[2]?.[i][3][3] ||"0"})`}
                                  />
                                  
                                </svg>
                                 <svg style={{position:"absolute"}}id="CirclePath" width="100%" height="100%" >
                                    <path
                                        d={overlayPaths[OllIndex][PermIndex]?.[2]?.[i][2]||""}
                                        fill={overlayPaths[OllIndex][PermIndex]?.[4]?.[i][1] || ""}
                                      stroke="rgba(22, 22, 22, 1)"
                                      strokeWidth="1"
                                    />
                                  </svg>

                                </>))
                               } 
                                
                                
                                {/* <svg style={{position:"absolute", zIndex:"100"}}id="GoodLine" width="100%" height="100%">

                                    
                                    <path
                                      d={"M 58,54 L 58,56 L 133,56 L 133,54 Z "}
                                      fill={"rgba(207, 1, 1, 1)"}
                                      stroke="rgba(255, 0, 234, 1)"
                                      strokeWidthstrokeWidth="0.1"
                                      filter="url(#shadow)"
                                      transform="rotate(45)"
                                    />
                                </svg>                              */}
                                </>
                                )
                            }
                            </div>
                              <div className='CpGridOverlay' style={{height:`${cubeSize*160/200}px`,width:`${cubeSize*160/200}px`,marginTop:`${45+cubeSize/10}px`}}>
                            
                               </div>
                              </div>
                               
                        </>
                              )})}
                          
                      
                      </div>
<div className="barExcludeCont">
  <div></div>
  <div style={{display:"flex",justifyContent:"center",justifySelf :"end"}}>
    <div className="barQuestionIconCont">
        <FaIcon className="barQuestionCircle" icon="question-circle" style={{ color: "white",width:"24px",height:"24px",border:"2px solid black",borderRadius:"50%",verticalAlign:"middle"}} />
        <div className="barQuestionIconExtraInfo">
        {Array.from({ length: 5 }).map((_, i) =>
            Array.from({ length: 5 }).map((_, j) => (
              <div
                key={`${i}-${j}`}
                style={{
                  border: "1px solid grey",
                  backgroundColor: "black",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {i * 5 + j}
              </div>
            ))
          )}                  
        </div>
    </div>
          <label htmlFor={`barExcludeCenters-${i}`}>Do not include bars with:</label>
    </div>
    <div>
   <input id={`barExcludeCenters-${i}`} className="barExcludeCentersInput" placeholder="Exclude centers, ex: 1,2,3" defaultValue={oll.difficultCenters.join(',')} onKeyDown={ (e)=>(excludeCenters(e,i,oll))}></input>
  <button className="barExcludeButtonSave" onClick={() => {
    const value = document.getElementById(`barExcludeCenters-${i}`).value;
    verifyAndUpdateExcludeBarInput(value, i,oll);
  }}> Save</button></div>
  </div>
                      
<div className="barExcludeCont">
  <div></div>
  <div style={{display:"flex", justifyContent:"center",justifySelf :"end"}}>
   <label htmlFor={`barchangeOllAlg-${i}`}>Change alg:</label>
   </div>
   <div>
   <input id={`barchangeOllAlg-${i}`} className="barExcludeCentersInput" placeholder="Enter new alg, ex: R U R' U R U2 R'" onKeyDown={ (e)=>(changeOllAlgEnterPressed(e,oll))}></input>
  <button className="barExcludeButtonSave" onClick={() => {
    const value = document.getElementById(`barchangeOllAlg-${i}`).value;
    changeOllAlg(value, oll);
  }}> Save</button> </div>
  </div>
                      </div>
                      
                          )}
                      </> 
    ))}
    <div>

    </div>

    </div>
  )}


  {(false)&&
    selectedGroupOlls.map((oll,i)=>(
      <>
                          {(
                          <div>
                          <h2>{selectedGroupOlls[i].name==selectedGroupOlls[(i+1)%2].name?oll.name + " Version "+oll.algNumber:oll.name}</h2>
                          <div className="OllGrid">
                              
                              {CornerPermutations.map((_,j)=>{

                              const refIndex = i * CornerPermutations.length + j;
                              return(
                                <>
                              <div className="RecCont"  ref={(el) => setOverlayRef(el,refIndex)}>  
                              <h2 className="OllCpLocation">{oll.algNumber?CpLocation[j] +" -> "+oll.barMovements[PermTable[j]][0]:CpLocation[j] }</h2>
                              
                              <CaseImage
                                  size={cubeSize}
                                  alg={(oll.algs+CornerPermutations[PermTable[j]]).replace(/\s+/g, "")+"y2"}
                                  caseSetDetails={ScrambleVisualizerDetails}
                                  co="40"
                              ></CaseImage>
                              
                              </div>
                              <div  className='CpRecOverlay' style={{height:`${cubeSize*160/200}px`,width:`${cubeSize*160/200}px`,marginTop:`${45+cubeSize/10}px`}}> 
                        </div>
                        </>
                          )})}
                      </div>
                      </div>
                          )}
                    {(!oll.algNumber) &&(selectedGroupOlls[i].name==selectedGroupOlls[(i+1)%2].name)&&(
                      <div>
                          <h2>{oll.name + " AUF ("+oll.altAUF[0]+ ") Version 1"}</h2>
                          <div className="OllGrid">
                              
                              {CornerPermutations.map((_,j)=>{
                              return(
                              <div className="RecCont">  
                              <h2 className="OllCpLocation">{CpLocation[j] +" -> "+oll.barMovements[PermTable[j]][0]}</h2>
                              
                              <CaseImage
                                  size={cubeSize}
                                  //alg={""+scramble2.replace(/\s+/g, "")+"y2"}
                                      alg={(oll.altAUF[0]+"'"+oll.algs+CornerPermutations[PermTable[j]]).replace(/\s+/g, "")+"y2"}
                                  caseSetDetails={ScrambleVisualizerDetails}
                                  co="40"
                              ></CaseImage>
                              
                              </div>
                              )})}
                      </div>
                      </div>
                      )}    
                      </> 
    ))
  }
  {console.log("Problemo",changedAlgArray)}
  {(changedAlgArray.length>0 &&changedAlgArray[0] && changedAlgArray[1]!=null &&changedAlgArray[2]==true)  && (<>
        <CornerPermutationPage
          newAlg={changedAlgArray[0]}
          oll={changedAlgArray[1]}
        />
        </>
      )}

  </>

)

}

export default BarPersevation
