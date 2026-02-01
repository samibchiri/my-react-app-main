import CaseImage from "./cubing/cubeImage.jsx";

export default function OllCaseFilter({groupSelected,setGroupSelected,arrowOllSet,ollSelectList,setOllSelectList,darkMode,BackButtonstyle,caseDetails}) {



    console.log("Herre",ollSelectList)
    if (groupSelected == null) {
        return null; // stop execution here
    }

    function AddItemToQuickSelect(i){

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
    
  return (
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
                caseSetDetails={caseDetails}
                ></CaseImage>
            </div>
            
            </>
            )
        })
    }
        </div>
    </div>
    </>
  );
}


