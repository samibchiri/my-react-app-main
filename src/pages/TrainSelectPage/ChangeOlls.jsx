

export function ChangeOlls({newAlg,oll,setChangedAlgArray}){

console.log("SetChanged",newAlg,oll,setChangedAlgArray)
return (<>

   {(changedAlgArray.length>0 &&changedAlgArray[0] && changedAlgArray[1]!=null &&changedAlgArray[2]==true && changedAlgArray[0]!=changedAlgArray[1])  
       && (<>
       {console.log("NewPage")}
           <ArrowDataGenerator
             key={`${changedAlgArray[0]}-${changedAlgArray[1].id}`}
             newAlg={changedAlgArray[0]}
             oll={changedAlgArray[1]}
             onError={(errorMessage) => {
             console.warn("CornerPermutation error:", errorMessage);
   
             setChangedAlgArray([changedAlgArray[1], changedAlgArray[1], false]);
           }}
           />
           </>
           
         )}
</>

  
)
}

