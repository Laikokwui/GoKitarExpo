import openDB from "./db";

export const initDB = async () => {
	const db = await openDB();
	db.execAsync(
		`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        image_uri TEXT,
        created_at TEXT
      );`
	).then(() => {
    console.log("Posts table created");
  }
  ).catch((error) => {
    console.error("Error creating posts table:", error);
  }
  );
  console.log("Database initialized");
};
