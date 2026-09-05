import Dexie from "dexie";
import pllCaseSet from "../data/pllCaseSet";




export function PllDataGenerator(){

  let pllCases=[]

  if(pllCases.length==0){
    console.log("PllCases Start",pllCases)
  pllCaseSet.cases.forEach((pll,i)=>{
    
    let newPllDict1= {
      id:crypto.randomUUID(),
      name:pll.name,
      group:pll.group,
      pllNumber:i,
      algNumber:0,
      algAttemptCount:null,
      algSpeed:null,
      algTps:null,
      algs:pll.algs[0],
      scrambles:pll.scrambles,

    }
    let newPllDict2= {
      id:crypto.randomUUID(),
      name:pll.name,
      group:pll.group,
      pllNumber:i,
      algNumber:1,
      algAttemptCount:null,
      algSpeed:null,
      algTps:null,
      scrambles:pll.scrambles,
      algs:pll.algs[1]
    }
    console.log("AddPll",i,newPllDict1,newPllDict2)
    pllCases.push(newPllDict1)
    pllCases.push(newPllDict2)
  })
}

//Important!
    console.log(
    "const pllCases = " +
    JSON.stringify(pllCases, null, 2)
        .replace(/"([^"]+)":/g, '$1:') + 
    ";\n\nexport default pllCases;"
    );

    return <div>
        <h2> Hey</h2>
    </div>
}
