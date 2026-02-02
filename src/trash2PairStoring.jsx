
            if(oppTrue){

                let unique=true
                // console.log("test")
                // console.log(arrowCombination[Pairs[j][0]][index1])
                // console.log(arrowCombination[Pairs[j][0]][index1][2])
                for (let i=0; i<6;i++){
                    if(i!=Pairs[j][0] && i!=Pairs[j][1]){
                        if(arrowCombination[i][index1][2]=="opp"){
                            unique=false
                            //console.log(arrowCombination[Pairs[j][0]][index1],j)
                            break
                        }
                    }
                    
                }
                //console.log(`Continues, ${unique}`)

                if(unique){
                    // console.log("Not Broken")
                    // console.log(arrowCombination[Pairs[j][1]][index1])

                    let minpenalty=1000
                    
                    for( let index2=0;index2<arrowCombination[Pairs[j][1]].length;index2++){
                        if (arrowCombination[Pairs[j][0]][index2][2]!="adj" && arrowCombination[Pairs[j][1]][index2][2]!="adj"){
                            if(arrowCombination[Pairs[j][0]][index2][2]!=arrowCombination[Pairs[j][1]][index2][2]){
                                // console.log("Pair Found")
                                // console.log(arrowCombination[Pairs[j][0]][index2])
                                // console.log(arrowCombination[Pairs[j][1]][index2])
                                if(minpenalty>arrowCombination[Pairs[j][0]][index2][3]){
                                    minpenalty=arrowCombination[Pairs[j][0]][index2][3]

                                }
                                if(minpenalty==arrowCombination[Pairs[j][0]][index2][3]){
                                    // console.log(`Pair Accepted, ${minpenalty}`)
                                    // console.log(arrowCombination[Pairs[j][0]][index2])
                                   
                                    let center1a=arrowCombination[Pairs[j][0]][index1][0]
                                    let center1b=arrowCombination[Pairs[j][1]][index1][1]
                                    let center2a=arrowCombination[Pairs[j][0]][index2][0]
                                    let center2b=arrowCombination[Pairs[j][1]][index2][1]
                                    // console.log("Centers")
                                    // console.log(center1a,center1b,center2a,center2b)
                                    let totalpenalty=arrowCombination[Pairs[j][0]][index1][3]+arrowCombination[Pairs[j][0]][index2][3]
                                    
                                    let ArrayToPush= [[center1a,center1b,arrowCombination[Pairs[j][0]][index1][2],center2a,center2b,arrowCombination[Pairs[j][0]][index2][2],totalpenalty]]
                                    ArrayToPush.push([center1a,center1b,arrowCombination[Pairs[j][1]][index1][2],center2a,center2b,arrowCombination[Pairs[j][1]][index2][2],totalpenalty])
                                    if(j==0){
                                        if(FirstPairOppTrueList.length>0){
                                            let prevPenalty=FirstPairOppTrueList[0][0][6]
                                            let newPenalty=ArrayToPush[0][6]
                                            if(newPenalty<prevPenalty){
                                                FirstPairOppTrueList=[ArrayToPush]
                                            }
                                            if(newPenalty==prevPenalty){
                                                FirstPairOppTrueList.push(ArrayToPush)
                                            }
                                        }
                                        else{
                                            FirstPairOppTrueList.push(ArrayToPush)
                                        }
                                        
                                    }
                                    if(j==1){
                                        
                                        if(SecondPairOppTrueList.length>0){
                                           // console.log("NOTEMPTY")
                                            let prevPenalty=SecondPairOppTrueList[0][0][6]
                                            let newPenalty=ArrayToPush[0][6]
                                            if(newPenalty<prevPenalty){
                                                SecondPairOppTrueList=[ArrayToPush]
                                            }
                                            if(newPenalty==prevPenalty){
                                                SecondPairOppTrueList.push(ArrayToPush)
                                            }
                                        }
                                        else{
                                            SecondPairOppTrueList.push(ArrayToPush)
                                        }
                                        
                    
                                    }
                                    if(j==2){
                                         if(ThirdPairOppTrueList.length>0){
                                            //console.log("NOTEMPTY")
                                            let prevPenalty=ThirdPairOppTrueList[0][0][6]
                                            let newPenalty=ArrayToPush[0][6]
                                            if(newPenalty<prevPenalty){
                                                ThirdPairOppTrueList=[ArrayToPush]
                                            }
                                            if(newPenalty==prevPenalty){
                                                ThirdPairOppTrueList.push(ArrayToPush)
                                            }
                                        }
                                        else{
                                            ThirdPairOppTrueList.push(ArrayToPush)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            }
             if(sameTrue){
                let unique=true
                console.log("SameTRUE")
                console.log(arrowCombination[Pairs[j][0]][index1])
                console.log(arrowCombination[Pairs[j][0]][index1][2])
                for (let i=0; i<6;i++){
                    if(i!=Pairs[j][0] && i!=Pairs[j][1]){
                        if(arrowCombination[i][index1][2]=="same"){
                            unique=false
                            console.log(arrowCombination[Pairs[j][0]][index1],j)
                            break
                        }
                    }
                    
                }
                console.log(`Continues, ${unique}`)

                if(unique){
                    console.log("Not Broken")
                    console.log(arrowCombination[Pairs[j][1]][index1])

                    
                    
                    for( let index2=0;index2<arrowCombination[Pairs[j][1]].length;index2++){
                        if (arrowCombination[Pairs[j][0]][index2][2]!="adj" && arrowCombination[Pairs[j][1]][index2][2]!="adj"){
                            if(arrowCombination[Pairs[j][0]][index2][2]!=arrowCombination[Pairs[j][1]][index2][2]){
                                // console.log("Pair Found")
                                // console.log(arrowCombination[Pairs[j][0]][index2])
                                // console.log(arrowCombination[Pairs[j][1]][index2])
                                
                                    console.log("SameTrue")
                                    console.log(`Pair Accepted, ${minpenalty}`)
                                    console.log(arrowCombination[Pairs[j][0]][index2])
                                   
                                    let center1a=arrowCombination[Pairs[j][0]][index1][0]
                                    let center1b=arrowCombination[Pairs[j][1]][index1][1]
                                    let center2a=arrowCombination[Pairs[j][0]][index2][0]
                                    let center2b=arrowCombination[Pairs[j][1]][index2][1]
                                    console.log("Centers")
                                    console.log(center1a,center1b,center2a,center2b)
                                    let totalpenalty=arrowCombination[Pairs[j][0]][index1][3]+arrowCombination[Pairs[j][0]][index2][3]

                                    let ArrayToPush= [[center1a,center1b,arrowCombination[Pairs[j][0]][index1][2],center2a,center2b,arrowCombination[Pairs[j][0]][index2][2],totalpenalty]]
                                    ArrayToPush.push([center1a,center1b,arrowCombination[Pairs[j][1]][index1][2],center2a,center2b,arrowCombination[Pairs[j][1]][index2][2],totalpenalty])

                                    if(j==0){
                                        if(FirstPairSameTrueList.length>0){
                                            let prevPenalty=FirstPairSameTrueList[0][0][6]
                                            let newPenalty=ArrayToPush[0][6]
                                            if(newPenalty<prevPenalty){
                                                FirstPairSameTrueList=[ArrayToPush]
                                            }
                                            if(newPenalty==prevPenalty){
                                                FirstPairSameTrueList.push(ArrayToPush)
                                            }
                                        }
                                        else{
                                            FirstPairSameTrueList.push(ArrayToPush)
                                        }
                                        
                                    }
                                    if(j==1){
                                        
                                        if(SecondPairSameTrueList.length>0){
                                            console.log("NOTEMPTY")
                                            let prevPenalty=SecondPairSameTrueList[0][0][6]
                                            let newPenalty=ArrayToPush[0][6]
                                            if(newPenalty<prevPenalty){
                                                SecondPairSameTrueList=[ArrayToPush]
                                            }
                                            if(newPenalty==prevPenalty){
                                                SecondPairSameTrueList.push(ArrayToPush)
                                            }
                                        }
                                        else{
                                            SecondPairSameTrueList.push(ArrayToPush)
                                        }
                    
                                    }
                                    if(j==2){
                                         if(ThirdPairSameTrueList.length>0){
                                            console.log("NOTEMPTY")
                                            let prevPenalty=ThirdPairSameTrueList[0][0][6]
                                            let newPenalty=ArrayToPush[0][6]
                                            if(newPenalty<prevPenalty){
                                                ThirdPairSameTrueList=[ArrayToPush]
                                            }
                                            if(newPenalty==prevPenalty){
                                                ThirdPairSameTrueList.push(ArrayToPush)
                                            }
                                        }
                                        else{
                                            ThirdPairSameTrueList.push(ArrayToPush)
                                        }
                                    }
                                    
                                
                            }
                        }
                    }
                }

            }
            if(bothTrue){
                let unique=true
                // console.log("BOTHTRUE")
                // console.log(arrowCombination[Pairs[j][0]][index1])
                // console.log(arrowCombination[Pairs[j][1]][index1])
                for (let i=0; i<Pairs.length;i++){
                    if(i!=j){
                        if(arrowCombination[Pairs[j][0]][index1][2]!="adj"&&arrowCombination[Pairs[j][0]][index1][2]!=arrowCombination[Pairs[j][1]][index1][2]){
                            unique=false
                            console.log(arrowCombination[Pairs[j][0]][index1],j)
                            break
                        }
                    }
                    
                }
                // console.log(`Continues, ${unique}`)

                if(unique){
                    console.log("UniqueBothTrue")
                    console.log(arrowCombination[Pairs[j][1]][index1])

                    let minpenalty=1000
                    
                    for( let index2=0;index2<arrowCombination[Pairs[j][1]].length;index2++){
                        if (arrowCombination[Pairs[j][0]][index2][2]!="adj" && arrowCombination[Pairs[j][1]][index2][2]!="adj"){
                            if(arrowCombination[Pairs[j][0]][index2][2]!=arrowCombination[Pairs[j][1]][index2][2]){
                                // console.log("Pair Found")
                                // console.log(arrowCombination[Pairs[j][0]][index2])
                                // console.log(arrowCombination[Pairs[j][1]][index2])
                                if(minpenalty>arrowCombination[Pairs[j][0]][index2][3]){
                                    minpenalty=arrowCombination[Pairs[j][0]][index2][3]

                                }
                                if(minpenalty==arrowCombination[Pairs[j][0]][index2][3]){
                                    console.log(`Pair Accepted, ${minpenalty}`)
                                    console.log(arrowCombination[Pairs[j][0]][index2])
                                   
                                    let center1a=arrowCombination[Pairs[j][0]][index1][0]
                                    let center1b=arrowCombination[Pairs[j][1]][index1][1]
                                    let center2a=arrowCombination[Pairs[j][0]][index2][0]
                                    let center2b=arrowCombination[Pairs[j][1]][index2][1]
                                    console.log("Centers")
                                    console.log(center1a,center1b,center2a,center2b)
                                    let totalpenalty=arrowCombination[Pairs[j][0]][index1][3]+arrowCombination[Pairs[j][0]][index2][3]

                                    let ArrayToPush= [[center1a,center1b,arrowCombination[Pairs[j][0]][index1][2],center2a,center2b,arrowCombination[Pairs[j][0]][index2][2],totalpenalty]]
                                    ArrayToPush.push([center1a,center1b,arrowCombination[Pairs[j][1]][index1][2],center2a,center2b,arrowCombination[Pairs[j][1]][index2][2],totalpenalty])

                                    if(j==0){
                                        if(FirstPairBothTrueList.length>0){
                                            let prevPenalty=FirstPairBothTrueList[0][0][6]
                                            let newPenalty=ArrayToPush[0][6]
                                            if(newPenalty<prevPenalty){
                                                FirstPairBothTrueList=[ArrayToPush]
                                            }
                                            if(newPenalty==prevPenalty){
                                                FirstPairBothTrueList.push(ArrayToPush)
                                            }
                                        }
                                        else{
                                            FirstPairBothTrueList.push(ArrayToPush)
                                        }
                                        
                                    }
                                    if(j==1){
                                        
                                        if(SecondPairBothTrueList.length>0){
                                            console.log("NOTEMPTY")
                                            let prevPenalty=SecondPairBothTrueList[0][0][6]
                                            let newPenalty=ArrayToPush[0][6]
                                            if(newPenalty<prevPenalty){
                                                SecondPairBothTrueList=[ArrayToPush]
                                            }
                                            if(newPenalty==prevPenalty){
                                                SecondPairBothTrueList.push(ArrayToPush)
                                            }
                                        }
                                        else{
                                            SecondPairBothTrueList.push(ArrayToPush)
                                        }
                    
                                    }
                                    if(j==2){
                                         if(ThirdPairBothTrueList.length>0){
                                            console.log("NOTEMPTY")
                                            let prevPenalty=ThirdPairBothTrueList[0][0][6]
                                            let newPenalty=ArrayToPush[0][6]
                                            if(newPenalty<prevPenalty){
                                                ThirdPairBothTrueList=[ArrayToPush]
                                            }
                                            if(newPenalty==prevPenalty){
                                                ThirdPairBothTrueList.push(ArrayToPush)
                                            }
                                        }
                                        else{
                                            ThirdPairBothTrueList.push(ArrayToPush)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            }