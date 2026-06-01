
import arrowsInfoGen from "./1OllArrowCpInfo"
import BarPersevationOverlay from "./1OllBarInfo"

export default function CubeOverlay({oll,permIndex,cubeSize,cpEasyWanted,cpSameOppWanted,barMovementWanted}){

    let TrueFalseArray=[cpEasyWanted,cpSameOppWanted]
    console.log("TrueFalsear",TrueFalseArray)
    let pll="R U R' U' R' F R2 U' R' U' R U R' F'" //T-perm
    return (

        <>
        {TrueFalseArray.map((_,j)=>{

        return(
            <>
        {/* <div className='CpRecOverlay' style={{height:`${cubeSize*160/200}px`,width:`${cubeSize*160/200}px`,marginTop:`${-20+cubeSize/10}px`}}>
                             */}
            {arrowsInfoGen(oll,permIndex,cubeSize,cpEasyWanted,cpSameOppWanted).map((arrow, i) => (
                <svg
                key={i}
                width="100%"
                height="100%"
                style={{ position: "absolute" }}
                >
                <path
                    d={arrow.path}
                    fill={arrow.color}
                    stroke="rgba(0,0,0,1)"
                    strokeWidth="1"
                    transform={`rotate(${arrow.rotation} ${arrow.rotateX} ${arrow.rotateY})`}
                />
                </svg>
            ))}
                    
        {/* </div> */}
        </>
        )
        })}
        { (barMovementWanted) &&(
        <BarPersevationOverlay
        oll={oll}
        pll={pll}
        />
        )
        }
        </>
    )
    
}