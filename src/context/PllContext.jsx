

import React, { createContext, useContext, useMemo } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../data/NewGeneratedData/db.js";

const PllContext = createContext();
export const usePll = () => useContext(PllContext);

export const PllProvider = ({ children }) => {
  //const allPlls = useLiveQuery(() => db.plls.toArray(), [])?? [];
  const allPlls = useLiveQuery(
    () => db.plls.toArray().then(arr =>
      arr.sort((a, b) =>
        a.pllNumber - b.pllNumber || a.algNumber - b.algNumber
      )
    ),
    []
  ) ?? [];
  const getPllsByGroup = (group) => {
    return allPlls?.filter(pll => pll.group === group) ?? [];
  };

  // Add a new alg variant for a given pll number
  const addPllAlg = async (pllNumber, group, newAlg) => {
    try {
      // Find the highest algNumber for this pll
      //const existing = allPlls?.filter(o => o.pllNumber === pllNumber) ?? [];
      const existing=await db.plls.where("pllNumber").equals(pllNumber).toArray();
      const maxAlgNumber = existing.length > 0 ? Math.max(...existing.map(o => o.algNumber)) : -1;

      const newId = `PLL ${pllNumber}-${maxAlgNumber + 1}`;
      await db.plls.add({
        id: crypto.randomUUID(),
        pllNumber,
        algNumber: maxAlgNumber + 1,
        group,
        algs: newAlg
      });
    } catch (err) {
      console.error("Failed to add new PLL alg:", err);
    }
  };

  // Create an empty slot for an pll
  const createPllEmptySlot = async (pllNumber, group) => {
    try {
      const existing = allPlls?.filter(o => o.pllNumber === pllNumber) ?? [];
      const maxAlgNumber = existing.length > 0 ? Math.max(...existing.map(o => o.algNumber)) : -1;
      console.log("CopyEx",existing)
      const newId = crypto.randomUUID();
      await db.plls.add({
        ...existing[0],
        id: newId,
        algSpeed: null,
        algTps: null,
        algAttemptCount: null,
        pllNumber: pllNumber,
        algNumber: maxAlgNumber + 1,
        group: group,
        algs: ""
      });
    } catch (err) {
      console.error("Failed to create empty PLL slot:", err);
    }
  };

  // const swapPllsAlgnumber = async (firstPll,secondPll) =>{
    
  //   let firstAlgNumber = firstPll.algNumber
  //   let secondAlgNumber = secondPll.algNumber
    
  //   try {
  //     await db.plls.update(firstPll.id, { algNumber: secondAlgNumber });
  //     await db.plls.update(secondPll.id, { algNumber: firstAlgNumber });
      
  //   } catch (err) {
  //     console.error("Failed to update PLL alg:", err);
  //   }
  // }

  const swapPllsAlgnumber = async (firstPll, secondPll) => {
    try {
      console.log("SwapNum2",firstPll,secondPll)
        await db.transaction("rw", db.plls, async () => {

            const firstAlgNumber = firstPll.algNumber;
            const secondAlgNumber = secondPll.algNumber;

            await db.plls.update(
                firstPll.id,
                { algNumber: secondAlgNumber }
            );

            await db.plls.update(
                secondPll.id,
                { algNumber: firstAlgNumber }
            );
            console.log("AFTER SWAP");

        console.log(
            await db.plls.get(firstPll.id)
        );

        console.log(
            await db.plls.get(secondPll.id)
        );
        });

    } catch (err) {
        console.error("Failed to swap PLL alg numbers:", err);
    }
};

  const value = {
    allPlls,
    getPllsByGroup,
    addPllAlg,
    createPllEmptySlot,
    swapPllsAlgnumber,
  };

  return (
  <PllContext.Provider value={value}>
    {children}
  </PllContext.Provider>
);

};

export function sortPlls(a, b) {
  return a.pllNumber - b.pllNumber || a.algNumber - b.algNumber;
}