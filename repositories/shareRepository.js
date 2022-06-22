import db from "../config/db.js"

async function getPostInfos(postId) {
  return db.query(
    `SELECT message, shared_url
    FROM posts
    WHERE id = $1
    `,
    [postId],
  )
}

async function insertPostShared(userId, postId, message, sharedUrl) {
  return db.query(
    `INSERT INTO posts
    (user_id, message, shared_url, shared_post_id)
    VALUES ($1, $2, $3, $4)
    `,
    [userId, message, sharedUrl, postId],
  )
}

async function getUserPostInfos(sharedPostId) {
  return db.query(
    `SELECT u.username, u.profile_image AS "profileImage"
    FROM posts p
    JOIN users u ON u.id = p.user_id
    WHERE p.id = $1
    `,
    [sharedPostId],
  )
}

const shareRepository = {
  getPostInfos,
  insertPostShared,
  getUserPostInfos,
}

export default shareRepository
