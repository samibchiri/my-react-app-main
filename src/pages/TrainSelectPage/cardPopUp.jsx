import React, { useEffect, useRef, useState } from "react"; // removed 'use'
import { Modal } from "react-bootstrap";
import { FaIcon } from '../../assets/fontAwesome.js';
import CaseImage from "../../components/Oll/cubing/cubeImage.jsx";
import "../../styling/index.css";
import '../../styling/PopUp.css';
import {ArrowDataGenerator} from "../../dataGeneration/ArrowDataGenerator.jsx"


import { useLiveQuery } from "dexie-react-hooks";
import { db } from '../../data/db.js';

import { useOll } from "../../context/OllContext";

import {sortOlls} from "../../context/OllContext.jsx"
import { ChangeOlls } from "./ChangeOlls.jsx";

function ShowAlgCard({alg,onClose,AlgCasesSet}){
    console.log("Showing Card",alg)

    const {swapOllsAlgnumber } = useOll();

        
    const [editClick1,setEditClick1]= useState(false)
    const [editClick2,setEditClick2]= useState(false)
    const [editedAlg1,setEditedAlg1]=useState([])
    const [editedAlg2,setEditedAlg2]=useState([])
    const [existPrevAlg,setExistPrevAlg]= useState(false)

    // let handleSwapClicked= useRef(false)
    const [handleSwapClicked, setHandleSwapClicked] = useState(false);
    
    const [changedAlgArray,setChangedAlgArray]=useState(["","",false,null])

     const AlgVersions = useLiveQuery(()=>{
            
              return db.olls.where("ollNumber").equals(alg.ollNumber).toArray().then(arr => [...arr].sort(sortOlls));;
            },[]
          );
    console.log(AlgVersions)

    useEffect(()=>{
        if(editClick2 && InputAlg2.current){
            InputAlg2.current.focus()
        }
        if(editClick1 && InputAlg1.current){
            InputAlg1.current.focus()
        }
    })
    

    const InputAlg1= useRef(null)
    const InputAlg2= useRef(null)

    let DefaultAlg1= AlgVersions?AlgVersions[0].algs:""
    let DefaultAlg2= AlgVersions?.[1]?AlgVersions[1].algs:""

    const handleSwap = async () => {
    if(handleSwapClicked==false){

        setHandleSwapClicked(true)
        setTimeout(() => {
            //handleSwapClicked.current=false
            setHandleSwapClicked(false)
        }, 2000);
        if(!changedAlgArray[2]){
            if (AlgVersions?.[0]?.algs ) {
                setEditedAlg1((prev)=>[...prev,AlgVersions[1]])
                //setEditedAlg1([AlgVersions[0]]);
        // }
            }
            //if(editedAlg2.length==0){
                if (AlgVersions?.[1]?.algs) {
                    //setEditedAlg2([AlgVersions[1]]);
                    setEditedAlg2((prev)=>[...prev,AlgVersions[0]])
        }
        await swapOllsAlgnumber(AlgVersions[0], AlgVersions[1]);
        }
        setExistPrevAlg(true)
    }
    
  };
  
    useEffect(() => {
        if(!handleSwapClicked){

        
        console.log("Wut44",AlgVersions,editedAlg1,editedAlg2)
    //if(editedAlg1.length==0){
        if (AlgVersions?.[0]?.algs ) {
        setEditedAlg1((prev)=>[...prev,AlgVersions[0]])
        //setEditedAlg1([AlgVersions[0]]);
   // }
    }
    //if(editedAlg2.length==0){
        if (AlgVersions?.[1]?.algs) {
            //setEditedAlg2([AlgVersions[1]]);
            setEditedAlg2((prev)=>[...prev,AlgVersions[1]])
        }
        }
   // }
    }, [AlgVersions]);
    const CloseAndClearPopUp= (onClose)=>{
        setEditClick1(false)
        setEditClick2(false)
        onClose()
    }

    const SaveInput1=(e)=>{
        if(e.key=="Enter"){
            e.preventDefault()
            SaveAndChange1()
            
        }
    }
    const SaveInput2=(e)=>{
        if(e.key=="Enter"){
            e.preventDefault()
            SaveAndChange2()
            
        }
    }

    const SaveAndChange1= ()=>{
        
        console.log("Default")
        
        
        
        let Alg1Input=document.getElementById("PopUpInputAlg1").value

        
        if(Alg1Input&&Alg1Input!=editedAlg1[editedAlg1.length-1].algs){
            console.log("Same",Alg1Input,editedAlg1[editedAlg1.length-1])
            console.log("Changalgarray1",[Alg1Input, AlgVersions[0], true])
            // setEditedAlg2((prev)=>[...prev,prev[prev.length-1]])
            // setEditedAlg1((prev)=>[...prev,Alg1Input])
            setChangedAlgArray([Alg1Input, AlgVersions[0], true,1])
            
        }
        // else{
        //     setEditedAlg1((prev)=>[...prev,prev[prev.length-1]])
        // }
        setEditClick1(false)

        
        if(Alg1Input&&Alg1Input!=editedAlg1[editedAlg1.length-1].algs){
            setExistPrevAlg(true)
        }
        console.log("Same2",editedAlg1)
    }


    const SaveAndChange2= ()=>{
        
        console.log("Default")
        let Alg2Input=document.getElementById("PopUpInputAlg2").value
        
        console.log(Alg2Input)
        
        if(Alg2Input&&Alg2Input!=editedAlg2[editedAlg2.length-1]){
            // setEditedAlg1((prev)=>[...prev,prev[prev.length-1]])
            // setEditedAlg2((prev)=>[...prev,Alg2Input])
            console.log("Changalgarray2",[Alg2Input, AlgVersions[1], true])
            setChangedAlgArray([Alg2Input, AlgVersions[1], true,2])

        }
        else{
            //setEditedAlg2((prev)=>[...prev,prev[prev.length-1]])
        }
        setEditClick2(false)

        
        if(Alg2Input&&Alg2Input!=editedAlg2[editedAlg2.length-1]){
            setExistPrevAlg(true)
        }
    }

    const UndoAlgInput= async()=>{
        console.log("ConsoleUndo",editedAlg1,editedAlg2)

        if(!changedAlgArray[2]){
            // await db.olls.update(AlgVersions[0].id,editedAlg1[editedAlg1.length-2]);
            // await db.olls.update(AlgVersions[1].id,editedAlg2[editedAlg2.length-2]);

        
        
        if(editedAlg1.length>1){
            if(editedAlg1.length>2){
                setExistPrevAlg(true)
            }
            else{
                setExistPrevAlg(false)
            }
            setEditedAlg1((prev)=>prev.slice(0,-1))
        }
        
        if(editedAlg2.length>1){
            if(editedAlg2.length>2){
                setExistPrevAlg(true)
            }
            else{
                setExistPrevAlg(false)
            }
            setEditedAlg2((prev)=>prev.slice(0,-1))
        }

        console.log("SameUndoing",editedAlg1,editedAlg2)
        // if(editedAlg1.length > 1 || editedAlg2.length > 1){
        //      console.log("Exist Prev",editedAlg1,editedAlg2,editedAlg1.length,editedAlg2.length)
        //     setExistPrevAlg(true)
        // }
        // else{
        //     console.log("No Prev")
        //     setExistPrevAlg(true)
        // }
        }
        
    }

//     useEffect(() => {
//         console.log("Wut4",changedAlgArray,editedAlg1,editedAlg2,AlgVersions)
//   if (changedAlgArray[3] == 1) {
//     setEditedAlg1(prev => [...prev, prev[prev.length - 1]]);
//     setEditedAlg2(prev => [...prev, AlgVersions[1]]);
//   }

//   if (changedAlgArray[3] == 2) {
//     setEditedAlg1(prev => [...prev, AlgVersions[0]]);
//     setEditedAlg2(prev => [...prev, prev[prev.length - 1]]);
//   }

// }, [changedAlgArray,existPrevAlg]);


    console.log("EditedAlg",editedAlg1,editedAlg2)
    return (
        <Modal centered className="ModalPopUp" show={true} onHide={onClose}
        dialogClassName="alg-modal-dialog"
      contentClassName="alg-modal-content">
            <Modal.Header className="justify-content-center">
                <Modal.Title className="popUpTitle">{alg.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <CaseImage
                    size={200}
                    alg={DefaultAlg1?DefaultAlg1:""}
                    caseSetDetails={AlgCasesSet.details}
                ></CaseImage>
                <div className="popUpContainer">
                    <table className="popUpTable text-center">
                        <tbody>
                        <tr className="popUpRow">
                            <th>
                                Name
                            </th>
                            <th>
                                {alg.name}
                            </th>
                        </tr>
                        <tr className="popUpRow">
                            <td className="PopUpTd1">
                                Group
                            </td>
                            <td className="PopUpTd2">
                                {alg.group}
                            </td>
                        </tr>
                        <tr className="popUpRow">
                            <td className="PopUpTd1">
                                Case Set
                            </td>
                            <td className="PopUpTd2">
                                {AlgCasesSet.details.title}
                            </td>
                            
                        </tr>
                        <tr className="popUpRowScramble">
                            <td className="PopUpTd1">
                                Scramble
                            </td>
                            <td className="PopUpTd2">
                                {alg.scrambles[0]}
                            </td>
                            
                        </tr>
                        <tr className="popAlgUpRow">
                            <td className="PopUpTd1">
                                Algorithm 1
                            </td>
                            {
                                !editClick1 && 
                            <td className="PopUpTd2">
                                {editedAlg1[editedAlg1.length - 1]?.algs}
                            </td>
                            }
                           
                            {
                            editClick1 &&
                            <td className="PopUpTd2">
                                <input type="text" onKeyDown={SaveInput1} ref={InputAlg1} wrap="soft"  rows="2" id="PopUpInputAlg1" placeholder="Enter Algorithm"/>
                                
                            </td>
                           
                            }
                            <td className="PopUpTd3" >
                                <div id="buttonSaveAndCopy1">

                                <button className="PopUpCopyButton" onClick={() => {
                                    navigator.clipboard.writeText(editedAlg1[editedAlg1.length - 1]?.algs)}}>
                                    <FaIcon icon="copy"></FaIcon>
                                </button>
                                {editClick1 &&
                                 <button  className="PopUpButtonSave" onClick={()=>{SaveAndChange1()}}>Save 

                                 </button>
                                }
                                {!editClick1 &&
                                    <button className="PopUpButtonSave" onClick={()=>{ if (changedAlgArray[2] == true) return
                                                                                        setEditClick1((prev)=>!prev)}}>Edit </button>
                                }
                                 </div>
                            </td>
                        </tr>
                        <tr style={{height:"10px"}}>
                            <td>

                            </td>
                            <td>
                            <div className={`swapAlgsButton  ${!changedAlgArray[2]&&!handleSwapClicked ? "active" : ""}`} onClick={(()=>handleSwap())}>
                                 <FaIcon icon="arrows-up-down"  ></FaIcon>
                            </div>
                            </td>
                            <td>
                                
                            </td>
                        </tr>
                        <tr className="lastPopUpRow">
                            <td className="PopUpTd1">
                                Algorithm 2
                            </td>
                            
                                {!editClick2 &&
                                <td className="PopUpTd2">
                                {editedAlg2[editedAlg2.length - 1]?.algs}
                                </td>
                                }
                                {editClick2 &&
                                <td className="PopUpTd2">
                                    <input type="text" onKeyDown={SaveInput2} ref={InputAlg2} wrap="hard" rows="2" id="PopUpInputAlg2" placeholder="Enter Algorithm"/>
                                </td>
                                }
                            
                            <td>
                                <div id="buttonSaveAndCopy2">

                                <button className="PopUpCopyButton" onClick={() => {
                                    navigator.clipboard.writeText(editedAlg2[editedAlg2.length - 1]?.algs)}}>
                                    <FaIcon icon="copy"></FaIcon>
                                </button>
                                {editClick2 &&
                                 <button  className="PopUpButtonSave" onClick={()=>{SaveAndChange2()}}>Save 

                                 </button>
                                }
                                {!editClick2 &&
                                    <button className="PopUpButtonSave" onClick={()=>{ if (changedAlgArray[2] == true) return
                                                                                        setEditClick2((prev)=>!prev)}}>Edit </button>
                                }
                                 </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    {
                        existPrevAlg && !editClick1 &&!editClick2 &&
                        <button onClick={()=>{UndoAlgInput()}} className={`PopUpButtonClose ${!changedAlgArray[2]&&!handleSwapClicked ? "active" : ""}`}>Undo
                        </button>
                         
                    }
                    {
                        !existPrevAlg &&
                        <button className="PopUpButtonHidden">Undo
                        </button>
                    }
                    
                    {/* {
                        !editClick &&
                        <>
                            <button className="PopUpButtonClose" onClick={()=>{setEditClick((prev)=>!prev)}}>Edit </button>
                        </>
                    } */}
                    {/* {
                        editClick &&
                        <>
                        <button className="PopUpButtonClose" onClick={()=>{setEditClick((prev)=>(!prev))}}>Undo</button>
                        
                       
                        </>
                    } */}
                 <button className="PopUpButtonClose active" onClick={()=>CloseAndClearPopUp(onClose)}>Close </button>
                </div>
                
            </Modal.Footer>
            {(changedAlgArray.length>0 &&changedAlgArray[0] && changedAlgArray[1]!=null &&changedAlgArray[2]==true)  
                && (<>
                {console.log("NewPage")}
                
                    <ArrowDataGenerator
                      key={`${changedAlgArray[0]}-${changedAlgArray[1]}`}
                      newAlg={changedAlgArray[0]}
                      oll={changedAlgArray[1]}
                      onError={(errorMessage) => {
                      console.warn("CornerPermutation error:", errorMessage);
            
                      setChangedAlgArray([changedAlgArray[1], changedAlgArray[1], false,changedAlgArray[3]]);
                      setExistPrevAlg(false)
                    }}
                    onSuccess={() => {
                        console.log("Succes")
                      setChangedAlgArray([changedAlgArray[0], changedAlgArray[1], false,changedAlgArray[3]]);
                    }}
                    />
                    </>
                    
                  )}
            
        </Modal>
        
    )
}

export default ShowAlgCard