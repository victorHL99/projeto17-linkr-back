import bcrypt from "bcrypt"

import authRepository from "../repositories/authRepository.js"

export async function signupMiddleware(req, res, next) {
  const { email, username } = req.body
  try {
    const { rows: emails } = await authRepository.getEmail(email, username)
    const [emailConflict] = emails
    if (emailConflict) {
      return res.status(422).send("Email/Username already exists!")
    }
    next()
  } catch (e) {
    return res.status(500).send(e.message)
  }
}

export async function signinMiddleware(req, res, next) {
  const { email, password } = req.body
  try {
    const { rows: users } = await authRepository.getUserByEmail(email)
    const [user] = users
    if (!user?.email) {
      return res.status(401).send("User not found!")
    }
    if (!bcrypt.compareSync(password, user?.password)) {
      return res.status(401).send("Incorrect password!")
    }
    delete user.password
    res.locals.user = user
    next()
  } catch (e) {
    return res.status(500).send(e.message)
  }
}
