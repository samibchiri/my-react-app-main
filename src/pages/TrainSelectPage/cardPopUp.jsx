import CaseImage from "../../components/Oll/cubing/cubeImage.jsx";
import ollCaseSet from "../../data/ollCaseSet.js";
import { Modal, Button } from "react-bootstrap";
import './styling/index.css'
import './PopUp.css';
import React, { use, useContext, useEffect, useRef, useState } from "react";
import { FaIcon } from '../../assets/fontAwesome.js';

function ShowAlgCard({alg,onClose,AlgCasesSet}){
    console.log("Showing Card")
    console.log(alg)

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

    const CloseAndClearPopUp= (onClose)=>{
        setEditClick1(false)
        setEditClick2(false)
        onClose()
    }

    const DoubleClick2Handler=()=>{
        setEditClick2((prev)=>!prev)
        
        
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
        let DefaultAlg1= alg.algs[0]
        let DefaultAlg2=alg.algs[1]?alg.algs[1]:alg.algs[0]
        
        let Alg1Input=document.getElementById("PopUpInputAlg1").value

        setEditedAlg2((prev)=>[...prev,prev[prev.length-1]])
        
        if(Alg1Input){
            setEditedAlg1((prev)=>[...prev,Alg1Input])
        }
        else{
            setEditedAlg1((prev)=>[...prev,prev[prev.length-1]])
        }
        setEditClick1(false)

        
        if(Alg1Input){
            setExistPrevAlg(true)
        }
    }


    const SaveAndChange2= ()=>{
        
        console.log("Default")
        let DefaultAlg1= alg.algs[0]
        let DefaultAlg2=alg.algs[1]?alg.algs[1]:alg.algs[0]
        
        let Alg2Input=document.getElementById("PopUpInputAlg2").value
        
        console.log(Alg2Input)
        setEditedAlg1((prev)=>[...prev,prev[prev.length-1]])
        
        if(Alg2Input){
            setEditedAlg2((prev)=>[...prev,Alg2Input])
        }
        else{
            setEditedAlg2((prev)=>[...prev,prev[prev.length-1]])
        }
        setEditClick2(false)

        
        if(Alg2Input){
            setExistPrevAlg(true)
        }
    }

    const UndoAlgInput= ()=>{
        console.log("ConsoleUndo")
        console.log(editedAlg1)

        let DefaultAlg1=alg.algs[0]
        let DefaultAlg2=alg.algs[1]?alg.algs[1]:alg.algs[0]
        if(editedAlg1.length>1){
            setEditedAlg1((prev)=>prev.slice(0,-1))
        }
        
        if(editedAlg2.length>1){
            setEditedAlg2((prev)=>prev.slice(0,-1))
        }

        if(DefaultAlg1==editedAlg1[editedAlg1.length-2] &&DefaultAlg2==editedAlg2[editedAlg2.length-2]){
            console.log("No Prev")
            setExistPrevAlg(false)
        }
        else{
            console.log(editedAlg1[editedAlg1.length-1])
            setExistPrevAlg(true)
        }
        
    }
    
    const [editClick1,setEditClick1]= useState(false)
    const [editClick2,setEditClick2]= useState(false)
    const [editedAlg1,setEditedAlg1]=useState([alg.algs[0]])
    const [editedAlg2,setEditedAlg2]=useState(alg.algs[1]? [alg.algs[1]]:[alg.algs[0]])
    const [existPrevAlg,setExistPrevAlg]= useState(false)
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
                    alg={alg.algs[0]}
                    caseSetDetails={AlgCasesSet.details}
                ></CaseImage>
                <div className="popUpContainer">
                    <table className="popUpTable text-center table table-sm">
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
                            <td className="PopUpTd2" onDoubleClick={()=>{setEditClick1((prev)=>!prev)}}>
                                {editedAlg1[editedAlg1.length - 1]}
                                
                            </td>
                            }
                           
                            {
                            editClick1 &&
                            <td className="PopUpTd2">
                                <textarea onKeyDown={SaveInput1} ref={InputAlg1} wrap="soft"  rows="2" id="PopUpInputAlg1" placeholder="Enter Algorithm"></textarea>

                            </td>
                           
                            }
                            <td >
                                <div id="buttonSaveAndCopy1">

                                <button className="PopUpCopyButton" onClick={() => {
                                    navigator.clipboard.writeText(editedAlg1[editedAlg1.length - 1])}}>
                                    <FaIcon icon="copy"></FaIcon>
                                </button>
                                {editClick1 &&
                                 <button  className="PopUpButtonSave" onClick={()=>{SaveAndChange1()}}>Save 

                                 </button>
                                }
                                {!editClick1 &&
                                    <button className="PopUpButtonSave" onClick={()=>{setEditClick1((prev)=>!prev)}}>Edit </button>
                                }
                                 </div>
                            </td>
                        </tr>
                        <tr className="lastPopUpRow">
                            <td className="PopUpTd1">
                                Algorithm 2
                            </td>
                            
                                {!editClick2 &&
                                <td className="PopUpTd2" onDoubleClick={()=>{DoubleClick2Handler()}}>
                                {editedAlg2[editedAlg2.length - 1]}
                                </td>
                                }
                                {editClick2 &&
                                <td className="PopUpTd2">
                                    <textarea onKeyDown={SaveInput2} ref={InputAlg2} wrap="hard" rows="2" id="PopUpInputAlg2" placeholder="Enter Algorithm"></textarea>
                                </td>
                                }
                            
                            <td>
                                <div id="buttonSaveAndCopy2">

                                <button className="PopUpCopyButton" onClick={() => {
                                    navigator.clipboard.writeText(editedAlg2[editedAlg2.length - 1])}}>
                                    <FaIcon icon="copy"></FaIcon>
                                </button>
                                {editClick2 &&
                                 <button  className="PopUpButtonSave" onClick={()=>{SaveAndChange2()}}>Save 

                                 </button>
                                }
                                {!editClick2 &&
                                    <button className="PopUpButtonSave" onClick={()=>{setEditClick2((prev)=>!prev)}}>Edit </button>
                                }
                                 </div>
                            </td>
                        </tr>

                    </table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    {
                        existPrevAlg && !editClick1 &&!editClick2 &&
                        <button onClick={()=>{UndoAlgInput()}} className="PopUpButtonClose">Undo
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
                 <button className="PopUpButtonClose" onClick={()=>CloseAndClearPopUp(onClose)}>Close </button>
                </div>
                
            </Modal.Footer>
        </Modal>
    )
}

export default ShowAlgCard