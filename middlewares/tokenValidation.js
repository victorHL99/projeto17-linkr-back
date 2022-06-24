import jwt from "jsonwebtoken"
import dotenv from "dotenv"

import authRepository from "../repositories/authRepository.js"
dotenv.config()

export async function tokenValidation(req, res, next) {
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", "").trim()
  if (!token) {
    return res
      .status(401)
      .send("You must pass an authorization token in the request header!")
  }
  const secretKey = process.env.JWT_SECRET_KEY
  try {
    const data = jwt.verify(token, secretKey)
  } catch {
    verboseConsoleLog("Error:", error)
    return res.status(401).send("Invalid token!")
  }
  try {
    const { rows: sessions } = await authRepository.getSessionByToken(token)
    const [userSession] = sessions
    if (!userSession?.token) {
      return res.status(401).send("Session not found!")
    }
    if (!userSession?.id) {
      return res.status(401).send("User not found!")
    }
    res.locals.userId = userSession.id
    res.locals.token = token
    next()
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.status(500).send(error.message)
  }
}
