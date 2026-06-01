
import arrowOllSet from "./data/arrowOllSet.js";
//import arrowOllSet from "../../data/arrowOllSet copy.js"
import { ThemeContext } from './context/DarkThemeContext.jsx';
import React, { useMemo, useContext,useRef, useEffect, useState } from "react";
import './styling/index.css'
import { FaIcon } from './assets/fontAwesome.js';
import CaseImage from "./components/Oll/cubing/cubeImage.jsx";
import ollCaseSet from "./data/ollCaseSet.js";
import CubeOverlay from "./1OllArrowGenHelper.jsx"
import OllCaseFilter from "./components/Oll/OllCaseFilter.jsx";
import OllGroupSelector from "./components/Oll/OllGroupSelect.jsx";
import { db } from './data/db.js';

import { useLiveQuery } from "dexie-react-hooks";
import {sortOlls} from "./context/OllContext.jsx"
import BarPersevationOverlay from "./1OllBarInfo"


function LabsPage({ollNumber}){

    const [oll, setOll] = useState([]);
    let effectiveOllNumber=ollNumber ?? 21;

 useEffect(() => {
    async function fetchData() {
      const result = await db.olls
        .where("ollNumber")
        .equals(effectiveOllNumber)
        .toArray();

      setOll(result[1]);
    }

    fetchData();
  }, [ollNumber]);
 
  console.log("NewOll",oll,effectiveOllNumber)
// const allOlls = useLiveQuery(() => db.olls.toArray(), []);
// const changeOll = async (event)=>{
//     event.preventDefault()
//     const newOll= 
// }


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


let T_Perm="R U R' U' R' F R2 U' R' U' R U R' F'"
let F_Perm="R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R"
let Y_Perm="F R U' R' U' R U R' F' R U R' U' R' F R F'"

let CornerPermutations=["",T_Perm,"U2"+T_Perm   ,"U"+T_Perm,"U'"+T_Perm,Y_Perm]
let PermTable=[0,5,1,2,3,4]

let CpLocation=["Full","Diag","Left","Right","Front","Back"]

const cubeSize=150


    return (
        <>  {console.log("Weak", oll instanceof Array)}
            { (!(oll instanceof Array)) && (
                <div className="CpOllGridsCont">
                    {
                (
                    <>
            
                    <div>
                    {/* <h2>{oll.name}</h2> */}
                    <h2>{oll.name + "-"+oll.algNumber}</h2>
                    <h2>{oll.algs}</h2>
                    <div className="OllGrid">
                        
                        {CornerPermutations.map((_,j)=>
                        <div className="RecCont">  
                        <h2 className="OllCpLocation">{CpLocation[j]}</h2>
                        {/* <h2 className="OllCpLocation">{oll.algNumber?CpLocation[j] +" -> "+oll.barMovements[PermTable[j]][0]:CpLocation[j] }</h2> */}
                        {/* <div id="tempCont" style={{position:"relative",height:`${cubeSize*160/200}px`,width:`${cubeSize*160/200}`,marginBottom:"20px"}}>
                        <CaseImage
                            size={cubeSize}
                            //alg={""+scramble2.replace(/\s+/g, "")+"y2"}
                                alg={(oll.algs+CornerPermutations[PermTable[j]]).replace(/\s+/g, "")+"y2"}
                            caseSetDetails={ScrambleVisualizerDetails}
                            co="40"
                        ></CaseImage>

                        
                        <CubeOverlay
                            oll={oll}
                            permIndex={j}
                            cubeSize={cubeSize}
                            cpEasyWanted={false}
                            cpSameOppWanted={false}
                            barMovementWanted={false}
                            />


                        </div> */}
                        <div className='CpGridOverlay' style={{height:`${cubeSize*160/200}px`,width:`${cubeSize*160/200}px`,marginTop:`${-20+cubeSize/10}px`}}>
                            
                        </div>
                        </div>
                        )}
                    
                
                </div>
                </div>
                

                
                    <div>
                     
                    
                    <div className="OllGrid">
                        
                        {CornerPermutations.map((_,j)=>
                        <>
                        <div>
                        <h5 className="OllCpLocation">{CpLocation[j]}</h5>
                        

                        {/* <CaseImage
                            size={cubeSize}
                            //alg={""+scramble2.replace(/\s+/g, "")+"y2"}
                                alg={(oll.algs+CornerPermutations[PermTable[j]]).replace(/\s+/g, "")+"y2"}
                            caseSetDetails={ScrambleVisualizerDetails}
                            co="40"
                        ></CaseImage> */}

                        {/* <CubeOverlay
                            oll={oll}
                            permIndex={j}
                            cubeSize={cubeSize}
                            cpEasyWanted={false}
                            cpSameOppWanted={false}
                            barMovementWanted={true}
                            /> */}
                            
{/*                        
                        <div className='CpGridOverlay' style={{height:`${cubeSize*160/200}px`,width:`${cubeSize*160/200}px`,marginTop:`${-20+cubeSize/10}px`}}>
                            
                        </div> */}
                        { 
                                <BarPersevationOverlay
                                oll={oll}
                                pll={F_Perm}
                                permIndex={j}
                                cpEasyWanted={false}
                                cpSameOppWanted={true}
                                barMovementWanted={false}
                                />
                                
                                }
                        </div>
                        </>
                        )}
                    
                
                </div>
                </div>
                </>
                )
            
        }
        </div>
        )
            }
        </>
    )
}

export default LabsPage