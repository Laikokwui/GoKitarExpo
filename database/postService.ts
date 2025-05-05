import openDB from "./db";

// CREATE
export const createPost = async (
	title: string,
	content: string,
	imageUri: string,
	userId: string
) => {
	const db = await openDB();
	const createdAt = new Date().toISOString();
	await db.runAsync(
		`INSERT INTO posts (title, content, image_uri, userid, created_at) VALUES (?, ?, ?, ?,?)`,
		[title, content, imageUri, userId, createdAt]
	);
};

// READ ALL
export const getPosts = async () => {
	const db = await openDB();
	const posts = await db.getAllAsync("SELECT * FROM posts ORDER BY created_at DESC");
	return posts;
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
