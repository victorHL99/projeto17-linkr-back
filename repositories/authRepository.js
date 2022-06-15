import db from "../config/db.js"

async function insertUserDb(username, email, hashedPassword, profile_image) {
  return db.query(
    `INSERT INTO users (username, email, password, profile_image)
    VALUES ($1, $2, $3, $4)`,
    [username, email, hashedPassword, profile_image],
  )
}

async function getEmail(email) {
  return db.query(
    `SELECT email 
    FROM users WHERE email = $1`,
    [email],
  )
}

async function getUserByEmail(email) {
  return db.query(
    `SELECT id, username, email, password, profile_image 
    FROM users WHERE email = $1`,
    [email],
  )
}

async function insertSession(userId, token) {
  return db.query(
    `INSERT INTO sessions (user_id, token)
    VALUES ($1, $2)`,
    [userId, token],
  )
}

async function getSessionByToken(token) {
  return db.query(
    `SELECT users.id, sessions.token
    FROM sessions
    JOIN users ON sessions.user_id = users.id
    WHERE sessions.token = $1`,
    [token],
  )
}

const authRepository = {
  insertUserDb,
  getEmail,
  getUserByEmail,
  insertSession,
  getSessionByToken,
}

export default authRepository
