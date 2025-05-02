import * as SQLite from 'expo-sqlite';

const openDB = async() => {
   const db = await SQLite.openDatabaseAsync('gokitar.db');
   return db;
}

export default openDB;