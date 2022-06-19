import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

import authRepository from "../repositories/authRepository.js"

export async function postUser(req, res) {
  const { username, email, password, profileImage } = req.body
  const hashedPassword = bcrypt.hashSync(password, 10)
  try {
    await authRepository.insertUserDb(
      username,
      email,
      hashedPassword,
      profileImage,
    )
    res.sendStatus(201)
  } catch (e) {
    return res.status(500).send(e.message)
  }
}

export async function postSignin(req, res) {
  const { user } = res.locals
  const secretKey = process.env.JWT_SECRET_KEY
  const token = jwt.sign(user, secretKey)
  try {
    await authRepository.insertSession(user.id, token)
    res.send({ ...user, token })
  } catch (e) {
    return res.status(500).send(e.message)
  }
}

export async function postAutoLogin(req, res) {
  try {
    res.sendStatus(200)
  } catch {
    res.sendStatus(500)
  }
}

export async function deleteSession(req, res) {
  try {
    const { token } = res.locals
    await authRepository.deleteSessionByToken(token)
    res.sendStatus(200)
  } catch {
    res.sendStatus(500)
  }
}
