import { openDB } from "idb";

const initdb = async () =>
  openDB("contact", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("contact")) {
        console.log("contact database already exists");
        return;
      }
      db.createObjectStore("contact", {
        keyPath: id,
        autoIncrement: true,
      });
      console.log("contact database created!");
    },
  });

export const postDb = async (name, homePhone, cellPhone, email) => {
  console.log("POST to the database!");

  const contactDB = await openDB("contact", 1);

  const tx = contactDB.transaction("contact", "readwrite");

  const store = tx.objectStore("contact");

  const request = store.add({
    name: name,
    home_phone: homePhone,
    cell_phone: cellPhone,
    email: email,
  });

  const result = await request;

  console.log("the data is off - saved to database", result);
};

export const getDb = async () => {
  console.log("GET from the database!");

  const contactDB = await openDB("contact", 1);

  const tx = contactDB.transaction("contact", "readonly");

  const store = tx.objectStore("contact");

  const request = store.getAll();

  const result = await request;
  console.log("result value", result);
  return result;
};

export const deleteDb = async (id) => {
  console.log("DELETE from the database!", id);

  const contactDB = await openDB("contact", 1);

  const tx = contactDB.transaction("contact", "readwrite");

  const store = tx.objectStore("contact");

  const request = store.delete(id);

  const result = await request;

  console.log("result value", result);
  return result?.value;
};

initdb();
