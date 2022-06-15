import bcrypt from "bcrypt"

import db from "../config/db.js"
import authRepository from "../repositories/authRepository.js"

export const signupMiddleware = async (req, res, next) => {
  const { email } = req.body
  try {
    const { rows: emails } = await authRepository.getEmail(email)
    const [emailConflict] = emails
    if (emailConflict) {
      return res.status(422).send("Email already exists!")
    }
    next()
  } catch (e) {
    return res.status(500).send(e.message)
  }
}

export const signinMiddleware = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await db.query(
      `SELECT id, username, email, password, profile_image 
      FROM users WHERE email = $1`,
      [email],
    )
    if (!user.rows[0]?.email) {
      return res.status(401).send("User not found!")
    }
    if (!bcrypt.compareSync(password, user.rows[0]?.password)) {
      return res.status(401).send("Incorrect password!")
    }
    delete user.rows[0].password
    res.locals.user = user.rows[0]
    next()
  } catch (e) {
    return res.status(500).send(e.message)
  }
}
