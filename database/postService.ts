import openDB from "./db";

/**
 * create post
 * @param title 
 * @param content 
 * @param imageUri 
 * @param userId 
 */
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

/**
 * get list of posts
 * @returns 
 */
export const getPosts = async () => {
	const db = await openDB();
	const posts = await db.getAllAsync("SELECT * FROM posts ORDER BY created_at DESC");
	return posts;
};

/**
 * get post by id
 * @param id 
 * @returns 
 */
export const getPostById = async (id: any) => {
	const db = await openDB();
	const post = await db.getFirstAsync("SELECT * FROM posts WHERE id = ?", [id]);
	return post;
};

/**
 * update post by id
 * @param id 
 * @param title 
 * @param content 
 * @param imageUri 
 * @returns 
 */
export const updatePost = async (
	id: number,
	title: string,
	content: string,
	imageUri: string
) => {
	const db = await openDB();
	await db.runAsync(
		"UPDATE posts SET title = ?, content = ?, image_uri = ? WHERE id = ?",
		[title, content, imageUri, id]
	);
};

/**
 * delete post by id
 * @param id 
 * @returns 
 */
export const deletePost = async (id: number) => {
	const db = await openDB();
	await db.runAsync("DELETE FROM posts WHERE id = ?", [id]);
};
