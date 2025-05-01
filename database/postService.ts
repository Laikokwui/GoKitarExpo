// postService.js
import db from './db';

// CREATE
export const createPost = (title, content) => {
  const createdAt = new Date().toISOString();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO posts (title, content, created_at) VALUES (?, ?, ?)',
        [title, content, createdAt],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

// READ ALL
export const getPosts = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM posts ORDER BY created_at DESC',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

// UPDATE
export const updatePost = (id, title, content) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE posts SET title = ?, content = ? WHERE id = ?',
        [title, content, id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

// DELETE
export const deletePost = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM posts WHERE id = ?',
        [id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};
