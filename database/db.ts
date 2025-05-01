import * as SQLite from 'expo-sqlite';

const db = await SQLite.openDatabaseAsync('gokitar.db');

export default db;