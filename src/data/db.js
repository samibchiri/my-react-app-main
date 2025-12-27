import Dexie from "dexie";
import arrowOllSet from "./arrowOllSet.js";

export const db = new Dexie("ollDatabase");

/*
  We store each algorithm variant as ONE ROW.
  id is a string like "OLL 21-0"
*/
db.version(1).stores({
  olls: `
    id,
    ollNumber,
    algNumber,
    group
  `
});

export async function seedDatabaseIfEmpty() {
  try {
    const count = await db.olls.count();

    if (count === 0) {
      console.log("Seeding IndexedDB with default OLLs...");
      await db.olls.bulkPut(arrowOllSet);
      const newCount = await db.olls.count();
      console.log(`IndexedDB seeded — ${newCount} records now present.`);
    } else {
      console.log(`IndexedDB already has data (${count} records); skipping seed.`);
    }
  } catch (err) {
    console.error("Error while seeding IndexedDB:", err);
  }
}