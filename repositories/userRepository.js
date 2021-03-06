import db from "../config/db.js"

async function getIdUserByToken(token) {
  return db.query(
    `
        SELECT users.id 
        FROM users
        JOIN sessions
        ON sessions."user_id" = users.id
        WHERE sessions.token = $1`,
    [token],
  )
}

async function getUserById(userId) {
  return db.query(
    `
    SELECT users.username
    , users.profile_image as "profileImage" 
    FROM users
    WHERE users.id = $1`,
    [userId],
  )
}

async function getUserByUsername(username, userId) {
  return db.query(
    `
    SELECT u.id, u.username,
    u."profile_image", 
    f."follower_id" AS "followed"  
    FROM users u
    LEFT JOIN follows f 
    ON f."followed_id" = u.id 
    AND f."follower_id" = $2
    WHERE username ILIKE $1
    ORDER BY "followed_id"`,
    [`%${username}%`, userId],
  )
}

async function getFollowCount(userId) {
  let queryText = `SELECT 
  count(follows.id) AS "followCount" 
  FROM follows
  WHERE follows.follower_id = $1
  GROUP BY follows.follower_id`

  return db.query(queryText, [userId])
}

const userRepository = {
  getIdUserByToken,
  getUserById,
  getUserByUsername,
  getFollowCount,
}

export default userRepository
