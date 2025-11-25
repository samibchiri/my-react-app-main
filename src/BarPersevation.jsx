
import arrowOllSet from "./data/arrowOllSet.js";
import { ThemeContext } from './DarkThemeContext.jsx';
import React, { use, useContext,useRef, useEffect, useState, useLayoutEffect } from "react";
import "./index.css"
import { FaIcon } from './fontAwesome.js';
import CaseImage from "./cubing/cubeImage.jsx";
import ollCaseSet from "./data/ollCaseSet.js";
import { TbRuler } from "react-icons/tb";

export function BarPersevation({algGroup,testedAlgs,setButtonClicked,setCaseClicked}){


  
  const [groupSelected,setGroupSelected]=useState(1)

  const [refsReady, setRefsReady] = useState(false);
  const [pathCalculated,setPathCalculated]= useState(true)
  const [overlayPaths, setOverlayPaths] = useState([]); // <-- new: store [path,color] per ref
  const [strokeWidth,setStrokeWidth]= useState(3)
  const [lineWidth,setLineWidth]= useState(4)
  const altoverlayRefs = useRef([]);
 
  let T_Perm="R U R' U' R' F R2 U' R' U' R U R' F'"
  let Y_Perm="F R U' R' U' R U R' F' R U R' U' R' F R F'"
  
  const cubeSize=200

  let CornerPermutations=["",T_Perm,"U2"+T_Perm   ,"U"+T_Perm,"U'"+T_Perm,Y_Perm]
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
  
function GetCentersPosition(cubeSize){
 
    const xCoords = [9, 39, 79.5, 120,150];
    const yCoords = [10.5, 40, 81.5, 122.5, 153.5];

    let Centers = [];

    for (let y of yCoords) {
        for (let x of xCoords) {
            Centers.push([x*(cubeSize/200)+5.65 /200*cubeSize, y*(cubeSize/200)-0.5]);
        }
    }

    return Centers

}

function GetBarsIndices(PermIndex){
  // console.log("I is :")
  // console.log(i)
  //i=i-i%6
  
  let containerparent = altoverlayRefs.current[PermIndex];
  
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
  //console.log(containerSvgSquaresInsideList)
  let ContainerSvgSquaresOutside= ContainerSvg.querySelectorAll("g")[2]
  
  let ContainerSvgSquaresOutsideList= ContainerSvgSquaresOutside.querySelectorAll("polygon")
  console.log(ContainerSvgSquaresOutsideList[0].getAttribute("points").split(" "))
  let combinedSquaresList=[...ContainerSvgSquaresInsideList,...ContainerSvgSquaresOutsideList]
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

  console.log(newSquaresColors)
  let colorIndexList=[[],[],[],[],[]]
  
  let colorList=[]
  for(let i=0;i<newSquaresColors.length;i++){
    if(!colorList.includes(newSquaresColors[i])){
      if(newSquaresColors[i]!=0){
        colorList.push(newSquaresColors[i])
      }
      

    }

  }

  
  colorList=["#00d800","orange","#1f51ff","red","yellow"]
  let contrastingcolorList=["rgba(13, 139, 13, 1)","rgba(255, 128, 1, 1)","rgba(3, 78, 216, 1)","rgba(207, 1, 1, 1)","yellow"]
  
  // console.log(colorList)
  // console.log("GetPoints")
  // for(let i=0;i<newSquaresColors.length;i++){
  //    if (newCombinedSquaresList[i]!=0){
  //   console.log(i)
  //   console.log(newCombinedSquaresList[i].getAttribute("points").split(" "))
  //    }
  // }

  for(let i=0;i<newSquaresColors.length;i++){
    if(newSquaresColors[i]!=0){
      let index= colorList.findIndex(x=> x==newSquaresColors[i])
      
      
      let Points=[]
      for(let j=0;j<4;j++){
        let tempPoints=newCombinedSquaresList[i].getAttribute("points").split(" ")
        Points.push(tempPoints[j].split(","))
        
      }
      
      colorIndexList[index].push([i,Points])
    }
  }
  
  function isCenter(index){
   
    let newIndex=index%10
    if(newIndex<5){
      if(newIndex%2==0){
        return 1
      }
    }
    else if (newIndex==7){
      return 1
    }
    if (index==11 || index==13){
      return 1
    }
    return 0
  }


  colorIndexList.forEach(list=>{
      
      list.sort((a,b)=>(isCenter(a[0])<isCenter(b[0])))
      list.forEach(pointList=>{
        pointList.sort((a, b) => {
          if (a[0] !== b[0]) return b[0] - a[0]; 
          return b[1] - a[1]; 
        });
      })
    } 
  )

   colorIndexList.forEach(list=>{
      
      list.sort((a,b)=>(isCenter(a[0])<isCenter(b[0])))
     
      list.forEach(pointList=>{
        let averagex=0
        //console.log("Item")
        pointList[1].forEach(item=>{
          
          averagex+=item[0]/4
        })
        let averagey=0
        pointList[1].forEach(item=>{
          averagey+=item[1]/4
        })
        
        let indextostore=[]
        //Store topleft topright bottom right bottomleft
        for(let i=0;i<4;i++){
          let [x,y]=pointList[1][i]
          
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
        let TempPointsList=[...pointList[1]]
        for(let i=0;i<4;i++){
          pointList[1][indextostore[i]]=TempPointsList[i]
        }
        
       
      })
    } 
  )



  
  

  let newPath=[[],[],[],[],[]]
  let ConnectingLines = Array.from({ length: 5 }, () =>
  Array.from({ length: 4 }, () => [])
);

  for(let i=0;i<5;i++){
    for(let j=0;j<colorIndexList[i].length;j++){
    
        console.log("Runs")
        if(i!=4){
          newPath[i]+=CalculateNewOutline(colorIndexList[i][j][1],strokeWidth,colorIndexList[i][j][0])
        
        }
        
     

    }
    if(i==3){ //Not yellow

      
      let distance
      
      let maxdistance=((Centers[6][0]-Centers[12][0])**2+(Centers[6][1]-Centers[12][1])**2)**(1/2)+1;
      maxdistance=1000
      distance=ConnectCenters(colorIndexList[i],0)[4]
      
      let circlePath=""

      let Center1Used=false
      let Center2Used=false

      if (distance<maxdistance){
      ConnectingLines[i][0]=ConnectCenters(colorIndexList[i],0)
      circlePath=ConnectingLines[i][1][5]
      Center1Used=true
      }
      distance=ConnectCenters(colorIndexList[i],1)[4]
      if (distance<maxdistance){
      ConnectingLines[i][1]=ConnectCenters(colorIndexList[i],1)
      if (Center1Used){
        circlePath=ConnectingLines[i][1][5]
      }
      Center2Used=true
      }
      
      if (!Center1Used|| !Center2Used){
        circlePath=""
      }
      

      ConnectingLines[i][2]=circlePath

      console.log("ArrowBarOnly")
      ConnectingLines[i][3]=ArrowBarMovement(colorIndexList[i],Center1Used,Center2Used,contrastingcolorList[i])

      console.log("CHeckOutput")
      console.log(ConnectingLines)
    }
    
  }
  
  
   
  

  let [path,color]= centerOutLineInfo(colorIndexList)
  //connectListIndices(colorIndexList[0])
  //pathCalculated?"":setPathCalculated(true)


  color=newSquaresColors[PermIndex]

  color="rgba(13, 139, 13, 1)"

  let finalPath=[[],[],[],[]]
  for(let i=0;i<5;i++){
    finalPath[i]=path[i]+newPath[i]
  }
  console.log("Newpath2")
  //console.log(finalPath)
  console.log(ConnectingLines)
  return [finalPath,contrastingcolorList,ConnectingLines]

}


function ArrowBarMovement(PointsInfo,Center1Used,Center2Used,color){
  

  let contrastingcolorList=["rgba(13, 139, 13, 1)","rgba(255, 128, 1, 1)","rgba(3, 78, 216, 1)","rgba(207, 1, 1, 1)","yellow"]
  let Centers= GetCentersPosition(cubeSize)

  console.log("ArrowBar")
  console.log(PointsInfo)

  let StartLocationX
  let StartLocationY

  let EndLocationX
  let EndLocationY
  
  if (color==contrastingcolorList[3]){
     EndLocationX=Centers[17][0]
     EndLocationY=Centers[17][1]
  }
  
  if (Center1Used && Center2Used){
    StartLocationX=Centers[PointsInfo[0][0]][0]
    StartLocationY=Centers[PointsInfo[0][0]][1]
    
  }

  else if(Center1Used){
    StartLocationX=(Centers[PointsInfo[0][0]][0]+Centers[PointsInfo[1][0]][0])/2
    StartLocationY=(Centers[PointsInfo[0][0]][0]+Centers[PointsInfo[1][0]][1])/2
  }

  let [pathArrow2,angle,centerx2,centery2,distance]=Connect2Points(StartLocationX,StartLocationY,EndLocationX,EndLocationY,true);
  
  console.log("ConnectingPath")
  console.log(pathArrow2)
  console.log(angle,centerx2,centery2)
  console.log()
  //return "M 40,40 L 40,80 L 42,80 L 42, 40 Z"

  console.log("SentData")
    console.log(pathArrow2,angle,centerx2,centery2)
  
  return [pathArrow2,angle,centerx2,centery2]
}


function Connect2Points(centerx,centery,centerx2,centery2,arrowBoolean){
  
  

// console.log("Datapoints")
// console.log(centerx,centery,centerx2,centery2)


let Correction=(centery2-centery)>0? 90:-90

let angle = Math.atan(-(centerx2 - centerx) / (centery2 - centery))*180/Math.PI;
if (centery==centery2){
    angle=0
    Correction=0
}
if (centerx>centerx2 && centery==centery2){
    [centerx, centerx2] = [centerx2, centerx];
    //let difference=centerx2-centerx
    // centerx-=difference
    // centerx2-=difference
    // centery2-=2.5
    // centery-=1.5
    Correction+=180
}

angle+=Correction


let distance=((centerx-centerx2)**2+(centery-centery2)**2)**(1/2)
centerx=centerx2-((centerx-centerx2)**2+(centery-centery2)**2)**(1/2)                                                                                                                                                                                                                                                                                                                   //L 37,41 37,45 27,39 37,33 Z"



//let pathArrow2=`M ${centerx+3},${centery2-2} L ${centerx2-1},${centery2-2} L ${centerx2-1},${centery2-6} L ${centerx2+8},${centery2} L ${centerx2-1},${centery2+6} L ${centerx2-1},${centery2+2} L ${centerx+3},${centery2+2} L ${centerx+3},${centery2+2} L ${centerx+3},${centery2+6} L ${centerx-6},${centery2} L ${centerx+3},${centery2-6}  Z`
//let pathArrow2=`M ${centerx+3},${centery2-2} L ${centerx2-1},${centery2-2} L ${centerx2-1},${centery2-6} L ${centerx2+8},${centery2} L ${centerx2-1},${centery2+6} L ${centerx2-1},${centery2+2} L ${centerx+3},${centery2+2} L ${centerx+3},${centery2+2} L ${centerx+3},${centery2+6} L ${centerx-6},${centery2} L ${centerx+3},${centery2-6}  Z`  
let pathArrow2=`M ${centerx-lineWidth/2},${centery2} Q ${centerx-lineWidth/2},${centery2-lineWidth/2} ${centerx},${centery2-lineWidth/2} L ${centerx},${centery2-lineWidth/2} L ${centerx2-lineWidth/2},${centery2-lineWidth/2}  Q ${centerx2},${centery2-lineWidth/2} ${centerx2},${centery2} L ${centerx2},${centery2}  Q ${centerx2},${centery2+lineWidth/2} ${centerx2-lineWidth/2},${centery2+lineWidth/2} L ${centerx2-lineWidth/2},${centery2+lineWidth/2} L ${centerx2},${centery2+lineWidth/2} L ${centerx},${centery2+lineWidth/2} Q ${centerx-lineWidth/2},${centery2+lineWidth/2} ${centerx-lineWidth/2},${centery2} Z`
    
if(arrowBoolean){
  // console.log("BooleanTrue")
  // console.log(arrowBoolean)
  pathArrow2=`M ${centerx-lineWidth/2},${centery2} Q ${centerx-lineWidth/2},${centery2-lineWidth/2} ${centerx},${centery2-lineWidth/2} L ${centerx},${centery2-lineWidth/2} L ${centerx2-lineWidth/2},${centery2-lineWidth/2} L ${centerx2-lineWidth/2},${centery2-3-lineWidth/2} L ${centerx2+4+lineWidth/2},${centery2} L ${centerx2-lineWidth/2},${centery2+3+lineWidth/2} L ${centerx2-lineWidth/2},${centery2+lineWidth/2} L ${centerx},${centery2+lineWidth/2} Q ${centerx-lineWidth/2},${centery2+lineWidth/2} ${centerx-lineWidth/2},${centery2} Z`
  
}
//console.log(distance)

return [pathArrow2,angle,centerx2,centery2-2,distance]
}

function ConnectCenters(PointsInfo,CenterIndex){


  let PiecesIndex=[]
  for(let i=0; i<PointsInfo.length;i++){
    PiecesIndex.push(PointsInfo[i][0])
  }
  // console.log("PiecesIndices")
  // console.log(PiecesIndex)
  
  Centers=GetCentersPosition(cubeSize)


  let tempcenterx=Centers[PiecesIndex[CenterIndex+1]][0]
  let tempcentery=Centers[PiecesIndex[CenterIndex+1]][1]
  let tempcenterx2=Centers[PiecesIndex[0]][0]
  let tempcentery2=Centers[PiecesIndex[0]][1]
  let [path,angle,centerx2,centery2,distance]= Connect2Points(tempcenterx,tempcentery,tempcenterx2,tempcentery2)
  
  //let path=""
  
  let circleRadius=3
  
  let midPointx1=Centers[PiecesIndex[0]][0]
  let midPointy1=Centers[PiecesIndex[0]][1]
  let circlePath1=`M ${midPointx1+circleRadius},${midPointy1} A ${circleRadius},${circleRadius} 0 1 1 ${midPointx1-circleRadius},${midPointy1}
                                                              A ${circleRadius},${circleRadius} 0 1 1 ${midPointx1+circleRadius},${midPointy1}`
//   console.log("CirclePath")
//   console.log(circlePath1)
// console.log(PiecesIndex)
//   console.log(Centers[PiecesIndex[0]])
     //path+=circlePath1
    //path+=path1
 
    console.log("SentData")
    console.log(path,angle,centerx2,centery2)
  
  return [path,angle,centerx2,centery2,distance,circlePath1]
}

function CalculateNewOutline(PointList,strokeWidth,index){

  if(index%5==0||index%5==4){
    strokeWidth+=1
  }
   if(index%20<5){
    strokeWidth+=1
  }


  let Centers= GetCentersPosition(cubeSize)
  let Scale=13.1/0.15740740740740744/150*cubeSize
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
  //Clockwise!
  //solving y=ax+c going through (x1,y1) and (x2,y2)
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

  //console.log([newx1,newy1])
  if(Math.abs(newx1-averagex)>Math.abs(x1-averagex)){
    newx1= x1-x3
  }
  if(Math.abs(newy1-averagey)>Math.abs(y1-averagey)){
    newy1= y1-y3
  }

  newx1=parseFloat(newx1)
  newy1=parseFloat(newy1)
  slope=parseFloat(slope)
 // console.log(newy1,newx1,slope)
  let c=newy1-newx1*slope
  if(Math.abs(slope)=="Infnity"){
    c=0
  }

  //  console.log("Checkpoint2")
  // console.log([newx1,newy1,c])

  return [slope,c]
}


function CalculateNewCoordinates(c1,slope1,c2,slope2,x1,x2,strokeWidth,averagex){

  // console.log("Slopes")
  // console.log(slope1,slope2)
 
  // slope1*x+c1=slope2*x+c2
  // x=(c2-c1)/(slope1-slope2)
  // y=x*slope1+c1

  let interceptx=(c2-c1)/(slope1-slope2)

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

// function connectListIndices(IndexList){
//     let Centers= GetCentersPosition(cubeSize)
    
//     let pointsCenter=newCombinedSquaresList[IndexList[0]].getAttribute("points").split(" ")
//     console.log(pointsCenter)
//     let center1b=Centers[IndexList[0]][1]

//     let Offset=(Centers[1][0]-Centers[0][0])/2
//   }



const renderedCases = arrowOllSet[groupSelected];
const totalRefs = renderedCases.length * CornerPermutations.length;

useEffect(() => {
  if (!refsReady) return;
  for (let idx = 0; idx < altoverlayRefs.current.length; idx++) {
    const el = altoverlayRefs.current[idx];
    if (el) {
      GetBarsIndices(idx);
    }
  }
}, [refsReady]);

// ensure the refs array has stable length so indexed assignment works predictably
// useEffect(() => {
//   altoverlayRefs.current = Array(totalRefs).fill(null);
//   setRefsReady(false);
// }, [totalRefs]);

const setOverlayRef = (index) => (el) => {
  altoverlayRefs.current[index] = el;
  // check if all refs are now mounted (non-null)
  const mounted = altoverlayRefs.current.filter(Boolean).length;
  if (mounted >0) {
    setRefsReady(true);
  }
};

// compute overlayPaths after refs mount; run this AFTER setRefsReady becomes true
useLayoutEffect(() => {
  
  if (!refsReady) return;
  const paths = altoverlayRefs.current.map((_, idx) => {
    try {
      const result = GetBarsIndices(idx); 
      return result || ["","none"];
    } catch (err) {
      console.error('GetBarsIndices error for idx', idx, err);
      return ["","none"];
    }
  });
  console.log("Allpaths")
  console.log(paths)
  console.log()
console.log()
console.log()
console.log()
console.log()
  console.log()
  setOverlayPaths(paths);
  setPathCalculated(true);
}, [refsReady, groupSelected, totalRefs]);


function centerOutLineInfo(IndexList){
  console.log("GetOutline")
  console.log(IndexList)
  
  
  let Centers= GetCentersPosition(cubeSize)
  let CenterIndex=12
  console.log(Centers)

  let Points=[[],[],[],[],[]]
  for (let j=0;j<5;j++){
    for (let i=0;i<IndexList[j].length;i++){
  
    Points[j].push([])
  }}

  console.log("PointsNow")
  console.log(Points)

  let StartingPointx=Centers[12][0]
  let StartingPointy=Centers[12][1]
  //IndexList*Scale=13 0.1574*Scale=13
  // Scale is 13/0.1574=82.588
  let Scale=13.2/0.15740740740740744/150*cubeSize


  //For top height of halfCenter, Scale 2 is 59/0.7183908045977012= 82.128 
  //Scale=59/0.7183908045977012

  //For bottom height of halfCenter, Scale3 is: 46.5/0.5544061302681993 =83.875
  //Scale=83.875

  //For bottom width of halfCenter, Scale 4 is: 13.4/0.17445721583652612=76.81
  //Scale= 76.81

  //For top width of halfCenter, Scale 5 is: 13.1/0.16168582375478924=81.02
  //Scale= 81

  //IndexList: Color, Center+Points, Points, PointIndex

  //Points: Color, Center1, Corner1,Corner2
 
  for (let j=0;j<5;j++){ // Color
     for (let i=0;i<Points[j].length;i++){ //Center
    //console.log("TESTINGPOint")
    let TempPointsList=IndexList[j][i][1]
    // console.log(IndexList)
    // console.log(i,j)
    // console.log(IndexList[j])
    // console.log(IndexList[j].length)
    // console.log(TempPointsList)
    //Points[j][i]=[StartingPointx+Scale*TempPointsList[i].split(",")[0],StartingPointy+Scale*TempPointsList[i].split(",")[1]]
    let tempTempPointsList=[]
    for(let k=0;k<TempPointsList.length;k++){
      let xCoord=TempPointsList[k][0]
      let yCoord=TempPointsList[k][1]
      xCoord=StartingPointx+xCoord*Scale
      yCoord=StartingPointy+yCoord*Scale

      
      // if(IndexList[j][i][0]%20<5 ||IndexList[j][i][0]%5==0||IndexList[j][i][0]%5==4){
      //   console.log("HalfCenter")
      //   console.log(xCoord,yCoord)
      //   console.log(IndexList[j][i][0])
      // }
        
      

      tempTempPointsList.push([xCoord,yCoord])
    }
    //console.log(tempTempPointsList)
    Points[j][i]=tempTempPointsList

    
    
    if(IndexList[j][i][0]%20<5||IndexList[j][i][0]%5==0||IndexList[j][i][0]%5==4){
      // console.log("IndexHERE")
      // console.log(IndexList[j][i][0])
      
      // console.log(tempTempPointsList)
        
  let [x1,y1]=tempTempPointsList[0]
  let [x2,y2]=tempTempPointsList[1]
  let [x3,y3]=tempTempPointsList[2]
  let [x4,y4]=tempTempPointsList[3]

  let averagex=(x1+x2+x3+x4)/4
  let averagey=(y1+y2+y3+y4)/4

  // console.log("Coordinates")
  // console.log(tempTempPointsList)
  let tempStrokeWidth=1
  let [slope1,c1]=CalculateSlope(x1,y1,x2,y2,tempStrokeWidth,averagex,averagey)
  let [slope2,c2]=CalculateSlope(x2,y2,x3,y3,tempStrokeWidth,averagex,averagey)
  let [slope3,c3]=CalculateSlope(x3,y3,x4,y4,tempStrokeWidth,averagex,averagey)
  let [slope4,c4]=CalculateSlope(x4,y4,x1,y1,tempStrokeWidth,averagex,averagey)

  tempTempPointsList[0]= CalculateNewCoordinates(c4,slope4,c1,slope1,x4,x1,tempStrokeWidth,averagex)
  tempTempPointsList[1]= CalculateNewCoordinates(c1,slope1,c2,slope2,x1,x2,tempStrokeWidth,averagex)
  tempTempPointsList[2]= CalculateNewCoordinates(c2,slope2,c3,slope3,x2,x3,tempStrokeWidth,averagex)
  tempTempPointsList[3]= CalculateNewCoordinates(c3,slope3,c4,slope4,x3,x4,tempStrokeWidth,averagex)
      Points[j][i]=tempTempPointsList
      }
    }
    
    //console.log([StartingPointx,Scale,TempPointsList[i],TempPointsList[i][0],TempPointsList[i][1]])
  }
  console.log("PointsEnd")
  console.log(Points)
  let centerx=Centers[CenterIndex][0]
  let centery=Centers[CenterIndex][1]
  let scale=2

  let color="none"
  // let path = `M${centerx+Points[0][0]},${centery+Points[0][1]} L${centerx+Points[1][0]},${centery+Points[1][1]} 
  // L${centerx+Points[2][0]},${centery+Points[2][1]} L${centerx+Points[3][0]},${centery+Points[3][1]} Z`;
  
  let pointsPath=""
  // console.log("Points")
  // console.log(Points)
  let CentersOutlinePath=[[],[],[],[],[]]
  for(let k=0;k<5;k++){
  for(let i=0;i<Points[k].length;i++){
    let pointsPath=""
    for(let j=1;j<4;j++){
      //console.log(pointsPath)
      pointsPath+=" L "+ Points[k][i][j][0]+","+Points[k][i][j][1]+""
      if(Points[k][i][j][0]==undefined||Points[k][i][j][0]==undefined){
        console.log("UNDEFINED")
        console.log(k,i,j)
      }
    }
    pointsPath+=" Z"
    CentersOutlinePath[k]+=`M ${Points[k][i][0][0]},${Points[k][i][0][1]} ${pointsPath} `
  }}
  

  let Offset=13/150*cubeSize
  let OffsetX=Offset
  let OffsetY=Offset

 CenterIndex=1
  StartingPointx=Points[0][0][0][0]
  StartingPointy=Points[0][0][0][1]

//  Offset=13
  CenterIndex=13
  StartingPointx=Centers[CenterIndex][0]
  StartingPointy=Centers[CenterIndex][1]
      //OffsetY=Offset

    //Points=[[OffsetX,OffsetY],[OffsetX,-OffsetY],[-OffsetX,-OffsetY],[-OffsetX,OffsetY]]
  

  pointsPath=""
  let path2=""
  // for(let i=0;i<Points.length;i++){
  //   let xToAdd=Points[i][0]+StartingPointx
  //   let yToAdd=Points[i][1]+StartingPointy
  //   if(i!=0){
  //     pointsPath+="L "
  //   }
  //   pointsPath+= ""+ xToAdd+","+yToAdd+""
  // }
  // path2+= `M  ${pointsPath} Z `
  

  // console.log("Points")
  // console.log(Points[0])

  let pointsPath2=""
  // for(let i=0;i<3;i++){
  //   let j=0
  //     pointsPath2+=" "+ (Points[0][i][j][0]+10)+","+(Points[0][i][j][1]-5)+"L "
      // if(j==3){
      //   pointsPath2+="M "
      // }  
  // }
  //path2=` M ${Points[0][0][0]},${Points[0][0][1]} `+" "+pointsPath2 +"Z "
  path2="M " +" "+pointsPath2 +"Z "
  
  //   console.log("Path2")
  // console.log(path2)

  //let path=CentersOutlinePath+path2
  console.log("Path")
  console.log(CentersOutlinePath)

  
  return [CentersOutlinePath,color]

}



return (
  
  <>
  

  { (
    arrowOllSet[groupSelected].map((oll,i)=>(
      <>
                          {(
                          <div>

                          <h2>{(arrowOllSet[groupSelected][i].name==arrowOllSet[groupSelected][(i+1)%arrowOllSet[groupSelected].length].name||
                          
                          arrowOllSet[groupSelected][i].name==arrowOllSet[groupSelected][(i-1+arrowOllSet[groupSelected].length)%arrowOllSet[groupSelected].length].name)?
                          oll.name + " Version "+oll.algNumber:oll.name}</h2>
                          
                          
                          <div className="OllGrid">
                              
                              {CornerPermutations.map((_,j)=>{
                                if(i>=1){
                                  return
                                }

                              const refIndex = i * CornerPermutations.length + j;
                              return(
                                <>
                              <div className="RecCont"  ref={setOverlayRef(refIndex)}> 
                              <h2 className="OllCpLocation">{CpLocation[j]}</h2>
                              
                              <CaseImage
                                  size={cubeSize}
                                  //alg={""+scramble2.replace(/\s+/g, "")+"y2"}
                                      alg={(oll.algs+CornerPermutations[PermTable[j]]).replace(/\s+/g, "")+"y2"}
                                  caseSetDetails={ScrambleVisualizerDetails}
                                  co="40"
                              ></CaseImage>
                              
                              <div  className='CpRecOverlay' style={{height:`${cubeSize*160/200+10}px`,width:`${cubeSize*160/200+10}px`,marginTop:`${45+cubeSize/10}px`}}>
                           
                               {
                                pathCalculated &&(
                               <>
                               
                                {
                                Array.from({ length: 5 }, (_, i) => i).map(i => (
                                  <>
                                  
                                  {Array.from({ length: 2 }, (_, j) => j).map(j => (
                                  <>
                                  
                                  <svg style={{position:"absolute"}}id="Goodline" width="100%" height="100%" >
                                    
                                    <path
                                      d={overlayPaths[refIndex]?.[2]?.[i][j][0] || ""}
                                      fill={overlayPaths[refIndex]?.[1]?.[i] || "black"}
                                      
                                      stroke="rgba(44, 44, 44, 1)"
                                      strokeWidth="1"
                                      strokeLinejoin="round"
                                      
                                      
                                      transform={`rotate(${overlayPaths[refIndex]?.[2]?.[i][j][1] || "0"} ${overlayPaths[refIndex]?.[2]?.[i][j][2] ||"0"} ${overlayPaths[refIndex]?.[2]?.[i][j][3] ||"0"})`}
                                      //transform={`rotate 90 ${overlayPaths[refIndex]?.[2]?.[i][2] ||"0"} ${overlayPaths[refIndex]?.[2]?.[i][3] ||"0"}`}
                                      //transform={`rotate(90 ${overlayPaths[refIndex]?.[2]?.[i][j][2] || 0} ${overlayPaths[refIndex]?.[2]?.[i][j][3] || 0})`}

                                    />
                                    
                                </svg>

                                
                                      
                                        



                                    {/* <svg style={{position:"absolute", zIndex:"100"}}id="GoodLine" width="100%" height="100%">
                                    
                                    <path
                                      d={overlayPaths[refIndex]?.[0]?.[i] || ""}
                                      fill={overlayPaths[refIndex]?.[1]?.[i] || "black"}
                                      fillRule="evenodd"
                                      stroke="rgba(44, 44, 44, 1)"
                                      strokeWidth="1"
                                      strokeLinejoin="round"
                                      filter="url(#shadow)"
                                    />
                                </svg> */}
                                
                                </>
                                ))}
                                
                                <svg style={{position:"absolute"}}id="CirclePath" width="100%" height="100%" >
                                          <path
                                             d={overlayPaths[refIndex]?.[2]?.[i][2]||""}
                                             fill={overlayPaths[refIndex]?.[1]?.[i] || "black"}
                                            stroke="rgba(44, 44, 44, 1)"
                                            stroke-width="1"
                                          />
                                        </svg>
                                    <svg style={{position:"absolute"}}id="CirclePath" width="100%" height="100%" >
                                  <path
                                      d={overlayPaths[refIndex]?.[2]?.[i][3]||""}
                                      fill={overlayPaths[refIndex]?.[1]?.[i] || "black"}
                                    stroke="rgba(0, 0, 0, 1)"
                                      strokeWidth="1.5"
                                      strokeLinejoin="round"
                                      transform={`rotate(${overlayPaths[refIndex]?.[2]?.[i][3][1] || "0"} ${overlayPaths[refIndex]?.[2]?.[i][3][2] ||"0"} ${overlayPaths[refIndex]?.[2]?.[i][3][3] ||"0"})`}
                                      //transform={`rotate(0 ${overlayPaths[refIndex]?.[2]?.[i][3][2] ||"0"} ${overlayPaths[refIndex]?.[2]?.[i][3][3] ||"0"})`}

                                  />
                                </svg>

                                </>))
                               } 
                                
                                
                                <svg style={{position:"absolute", zIndex:"100"}}id="GoodLine" width="100%" height="100%">

                                    
                                    <path
                                      d={"M 58,54 L 58,56 L 133,56 L 133,54 Z "}
                                      fill={"rgba(207, 1, 1, 1)"}
                                      stroke="rgba(255, 0, 234, 1)"
                                      strokeWidth="0.1"
                                      filter="url(#shadow)"
                                      transform="rotate(45)"
                                    />
                                </svg> 
                                
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
                      </div>
                          )}


                      </> 
    ))
    
  )}

  {(false)&&
    arrowOllSet[groupSelected].map((oll,i)=>(
      <>
                          {oll.algNumber==0 &&(
                          <div>
                          <h2>{arrowOllSet[groupSelected][i].name==arrowOllSet[groupSelected][i+1].name?oll.name + " Version "+oll.algNumber:oll.name}</h2>
                          <div className="OllGrid">
                              
                              {CornerPermutations.map((_,j)=>{

                              const refIndex = i * CornerPermutations.length + j;
                              return(
                                <>
                              <div className="RecCont"  ref={setOverlayRef(refIndex)}>  
                              <h2 className="OllCpLocation">{oll.algNumber?CpLocation[j] +" -> "+oll.barMovements[PermTable[j]][0]:CpLocation[j] }</h2>
                              
                              <CaseImage
                                  size={cubeSize}
                                  //alg={""+scramble2.replace(/\s+/g, "")+"y2"}
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


                    {(!oll.algNumber) &&(arrowOllSet[groupSelected][i].name==arrowOllSet[groupSelected][i+1].name)&&(
                      
                    
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

  </>

)
        

}

export default BarPersevation