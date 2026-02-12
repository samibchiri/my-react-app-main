

import React, { createContext, useContext, useMemo } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../data/db.js";

const OllContext = createContext();
export const useOll = () => useContext(OllContext);

export const OllProvider = ({ children }) => {
  const allOlls = useLiveQuery(() => db.olls.toArray(), []);

  const getOllsByGroup = (group) => {
    return allOlls?.filter(oll => oll.group === group) ?? [];
  };

  // Add a new alg variant for a given oll number
  const addAlg = async (ollNumber, group, newAlg) => {
    try {
      // Find the highest algNumber for this oll
      const existing = allOlls?.filter(o => o.ollNumber === ollNumber) ?? [];
      const maxAlgNumber = existing.length > 0 ? Math.max(...existing.map(o => o.algNumber)) : -1;

      const newId = `OLL ${ollNumber}-${maxAlgNumber + 1}`;
      await db.olls.add({
        id: newId,
        ollNumber,
        algNumber: maxAlgNumber + 1,
        group,
        algs: newAlg
      });
    } catch (err) {
      console.error("Failed to add new OLL alg:", err);
    }
  };

  // Create an empty slot for an oll
  const createEmptySlot = async (ollNumber, group) => {
    try {
      const existing = allOlls?.filter(o => o.ollNumber === ollNumber) ?? [];
      const maxAlgNumber = existing.length > 0 ? Math.max(...existing.map(o => o.algNumber)) : -1;

      const newId = `OLL ${ollNumber}-Empty`;
      await db.olls.add({
        id: newId,
        ollNumber: ollNumber,
        algNumber: maxAlgNumber + 1,
        group: group,
        algs: null // empty
      });
    } catch (err) {
      console.error("Failed to create empty OLL slot:", err);
    }
  };

  const swapOllsAlgnumber = async (firstOll,secondOll) =>{
    
    let firstAlgNumber = firstOll.algNumber
    let secondAlgNumber = secondOll.algNumber
   
    try {
      await db.olls.update(firstOll.id, { algNumber: secondAlgNumber });
      await db.olls.update(secondOll.id, { algNumber: firstAlgNumber });
      
    } catch (err) {
      console.error("Failed to update OLL alg:", err);
    }
  }

  const value = useMemo(() => ({
    allOlls,
    getOllsByGroup,
    addAlg,
    createEmptySlot,
    swapOllsAlgnumber,
  }), [allOlls]);

  return (
  <OllContext.Provider value={value}>
    {children}
  </OllContext.Provider>
);

};
