import openDB from "./db";

// CREATE
export const createPost = async (
	title: string,
	content: string,
	imageUri: string
) => {
	const db = await openDB();
	const createdAt = new Date().toISOString();
	return new Promise(async (resolve, reject) => {
		await db.runAsync(
			`INSERT INTO posts (title, content, image_uri, created_at) VALUES (?, ?, ?, ?)`,
			[title, content, imageUri, createdAt]
		);
	});
};

// READ ALL
export const getPosts = async () => {
	const db = await openDB();
	return new Promise(async (resolve, reject) => {
		await db.getAllAsync("SELECT * FROM posts ORDER BY created_at DESC").then((posts) => {
			resolve(posts);
			console.log("Fetched posts:", posts);
		}).catch((error) => {		
			console.error("Error fetching posts:", error);
			reject(error);
		}
		);
	});
};

// UPDATE
export const updatePost = async (
	id: number,
	title: string,
	content: string,
	imageUri: string
) => {
	const db = await openDB();
	return new Promise(async (resolve, reject) => {
		await db.runAsync(
			"UPDATE posts SET title = ?, content = ?, image_uri = ? WHERE id = ?",
			[title, content, imageUri, id]
		);
	});
};

// DELETE
export const deletePost = async (id: number) => {
	const db = await openDB();
	return new Promise(async (resolve, reject) => {
		await db.runAsync("DELETE FROM posts WHERE id = ?", [id]);
	});
};
