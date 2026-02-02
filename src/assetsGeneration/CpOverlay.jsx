

export default function CpRecOverlay({cubeSize,arrowsInfo}){

    return (

        <>
        { (arrowsInfo.length)>0 &&(
        <div className='CpRecOverlay' style={{height:`${cubeSize*160/200}px`,width:`${cubeSize*160/200}px`,marginTop:`${-20+cubeSize/10}px`}}>
                            
            {arrowsInfo.map((arrow, i) => (
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
                    
        </div>
        )
        }
        </>
    )
    
}