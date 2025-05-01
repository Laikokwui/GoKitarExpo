// init.js
import db from "./db";

export const initDB = () => {
	db.execAsync((tx) => {
		tx.executeSql(
			`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        created_at TEXT
      );`
		);
	});
};
