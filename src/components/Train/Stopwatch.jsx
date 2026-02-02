import React, { use, useContext,useRef, useEffect, useState } from "react";


function Stopwatch(){

    const [isRunning,setIsRunning]=useState(false)
    const [elapsedTime,setElapsedTime]=useState(0)
    const intervalIdRef=useRef(null)
    const startTimeRef=useRef(0)
    const [elapsedTimeOfBuffer,setElapsedTimeOfBuffer]=useState(0)
    const [bufferIsRunning,setBufferIsRunning]=useState(false)
    const timerBufferId=useRef(null)
    const startTimerBufferRef=useRef(0)
    const [bufferDisabled,setBufferDisabled]=useState(false)

    const timerStartAllowedRef = useRef(false);
    useEffect(()=>{

        if(isRunning){
            intervalIdRef.current=setInterval(()=>{
                setElapsedTime(Date.now()-startTimeRef.current)
            },10)
        }
        return ()=>{
            clearInterval(intervalIdRef.current)
        }
    },[isRunning]);

    useEffect(()=>{
        if(bufferIsRunning){
            timerBufferId.current=setInterval(()=>{
                setElapsedTimeOfBuffer(Date.now()-startTimerBufferRef.current)
            },10)
        }
        return ()=>
            clearInterval(timerBufferId.current)
    },[bufferIsRunning]);

    useEffect(()=>{

        function StopTimerOrHold(e){
            
            
        
            const active=document.activeElement
            const isTyping =
            active.tagName === "INPUT" ||
            active.tagName === "TEXTAREA" ||
            active.isContentEditable;

            if (isTyping) return;

            if (e.code=="Space"){
                e.preventDefault();
            }
        
        if (isRunning==true){
            setIsRunning(false)
            setElapsedTimeOfBuffer(0)
            timerStartAllowedRef.current = false;
            setBufferDisabled(true)
           
        }
        else if (e.code=="Space" && bufferIsRunning==false &&bufferDisabled==false){
            setBufferIsRunning(true)
            startTimerBufferRef.current=Date.now()
            
        }

        }
        if(bufferIsRunning){

            if (elapsedTimeOfBuffer>500){
                document.getElementsByClassName("TestTimer")[0].style.color="#0afa0a"
                setElapsedTime(0)
            }
            else{
                document.getElementsByClassName("TestTimer")[0].style.color="red"
            }
        }
        if(!bufferIsRunning){
            
            document.getElementsByClassName("TestTimer")[0].style.color="white"
            
        }
         function startTimer(e){
            
            if (isRunning==false){
            setBufferDisabled(false)
        }
            if (elapsedTimeOfBuffer>500){
                timerStartAllowedRef.current = true;
            }
            setBufferIsRunning(false)
            
            const active=document.activeElement
            const isTyping =
            active.tagName === "INPUT" ||
            active.tagName === "TEXTAREA" ||
            active.isContentEditable;

            if (isTyping) return;

            if (e.code=="Space"){
                e.preventDefault();
            }
        if (e.code=="Space" && isRunning==false){
            
            if (timerStartAllowedRef.current==true){
    
                setIsRunning(true)
                startTimeRef.current=Date.now()
            }
            
        }
        
        

    }


    window.addEventListener("keydown",StopTimerOrHold)
        window.addEventListener("keyup",startTimer);
    return ()=> {window.removeEventListener("keydown",StopTimerOrHold);
    window.removeEventListener("keyup",startTimer);
    }
}, [isRunning,bufferIsRunning,elapsedTime,elapsedTimeOfBuffer,bufferDisabled]
    
)
   
    function formatTime(){
        let minutes=Math.floor(elapsedTime/1000/60 %60)
        let seconds=Math.floor(elapsedTime/1000 %60)
        let milliseconds= Math.floor((elapsedTime %1000)/10)
        let timestring
        milliseconds=String(milliseconds).padStart(2,"0")
        if (minutes>0){
            timestring=`${minutes}:${seconds}.${milliseconds}`
        }
        else{
            timestring=`${seconds}.${milliseconds}`
        }
        return timestring
    }

    return (
        <>
        


        <h3 className="TestTimer">{formatTime()}
            

        </h3>
        </>
    )
}

export default Stopwatch