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

const shareRepository = {
  insertRepost,
}

export default shareRepository
