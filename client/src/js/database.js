import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Open the database
  const db = await openDB('jate', 1);
  // Start a transaction, specify the store and mode
  const tx = db.transaction('jate', 'readwrite');
  // Get the store
  const store = tx.objectStore('jate');
  // Use the put method to add the content. If content has an id, it will update; otherwise, it will add a new entry
  const request = store.put({ id: 1, value: content }); // Assuming you want to store content with an id. Adjust as necessary.
  // Confirm the request
  const result = await request;
  console.log('Data saved to the database', result);
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Open the database
  const db = await openDB('jate', 1);
  // Start a transaction, specify the store and mode
  const tx = db.transaction('jate', 'readonly');
  // Get the store
  const store = tx.objectStore('jate');
  // Use the getAll method to get all entries in the store
  const request = store.getAll();
  // Use the result
  const result = await request;
  console.log('Data fetched from the database', result);
  return result;
};
initdb();
