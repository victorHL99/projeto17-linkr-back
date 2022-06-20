import SqlString from "sqlstring"

import db from "./../config/db.js"

async function getLikedByWho(postId, limit = 5) {
  const params = [postId]

  const limitArray = limit
    ? `(array_agg(users.username))[1:${SqlString.escape(limit)}]`
    : "array_agg(users.username)"

  const queryText = `SELECT array_remove(${limitArray},NULL) as "likedBy"
  FROM likes
  RIGHT JOIN posts ON posts.id = likes.post_id
  LEFT JOIN users ON users.id = likes.user_id
  WHERE posts.id = $1
  GROUP BY posts.id`

  return db.query(queryText, params)
}

async function addLike(userId, postId) {
  const queryText = `INSERT INTO 
  likes ("user_id","post_id")
  VALUES($1,$2)`

  const params = [userId, postId]

  return db.query(queryText, params)
}

async function deleteLike(userId, postId) {
  const queryText = `DELETE 
  FROM likes 
  WHERE user_id = $1 
  AND post_id = $2`

  const params = [userId, postId]

  return db.query(queryText, params)
}

async function isLikedByUser(userId, postId) {
  const queryText = `SELECT likes.* 
  FROM likes
  WHERE likes.user_id = $1 AND likes.post_id = $2
  `
  const params = [userId, postId]

  return db.query(queryText, params)
}

export const likesRepository = {
  getLikedByWho,
  addLike,
  deleteLike,
  isLikedByUser,
}
