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

async function deleteRepost(userId, postId) {
  return db.query(
    `DELETE FROM reposts
    WHERE id IN (
      SELECT id FROM reposts
      WHERE user_id = $1 AND post_id = $2
      LIMIT 1
    )
    `,
    [userId, postId],
  )
}

const shareRepository = {
  insertRepost,
  deleteRepost,
}

export default shareRepository
