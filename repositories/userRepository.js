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

async function getUserByName(name) {
  return(
    db.query(db.query(`
    SELECT username AS "userName",
    id AS "userId",
    profile_image AS "profileImage"
    from users 
    WHERE username 
    LIKE '%$1%'`,[name]))
  )
}

const userRepository = {
  getIdUserByToken,
  getUserById,
  getUserByName,
}

export default userRepository
