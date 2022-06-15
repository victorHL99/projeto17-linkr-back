import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

import db from "../config/db.js"
import authRepository from "../repositories/authRepository.js"

export const postUser = async (req, res) => {
  const { username, email, password, profile_image } = req.body
  const hashedPassword = bcrypt.hashSync(password, 10)
  try {
    await authRepository.insertUserDb(
      username,
      email,
      hashedPassword,
      profile_image,
    )
    res.sendStatus(201)
  } catch (e) {
    return res.status(500).send(e.message)
  }
}

export const postSignin = async (req, res) => {
  const { user } = res.locals
  const secretKey = process.env.JWT_SECRET_KEY
  const token = jwt.sign(user, secretKey)
  try {
    await db.query(
      `
      INSERT INTO sessions (user_id, token)
      VALUES ($1, $2)`,
      [user.id, token],
    )
    delete user.id
    res.send({ ...user, token })
  } catch (e) {
    return res.status(500).send(e.message)
  }
}
