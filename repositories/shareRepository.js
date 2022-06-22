import db from "../config/db.js"

async function insertRepost(userId, postId) {
  return db.query(
    `INSERT INTO reposts
    (user_id, post_id)
    VALUES ($1, $2)
    `,
    [userId, postId],
  )
}

async function getRepost() {
  return db.query(
    `SELECT 
    p.user_id AS "postUserId", 
    p.message, 
    p.shared_url AS "sharedUrl", 
    p.deleted, 
    r.created_at AS "createdAt", 
    r.user_id AS "repostUserId"
    FROM reposts r
    JOIN posts p ON p.id = r.post_id
    ORDER BY "createdAt" DESC
    `,
  )
}

const shareRepository = {
  insertRepost,
  getRepost,
}

export default shareRepository
