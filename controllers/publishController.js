import db from "../config/db.js"

import sessionsRepository from "../repositories/sessionsRepository.js"
import userRepository from "../repositories/userRepository.js"

export async function createPublish(req, res) {
  const { shared_url, message } = req.body
  const { token,userId } = res.locals

  try {
    await db.query(
      `
            INSERT INTO posts ("user_id", "shared_url", "message")
            VALUES ($1,$2,$3)`,
      [userId, shared_url, message],
    )

    return res.status(201).send("Publicação criada com sucesso")
  } catch (err) {
    return res.status(500).send(err.message)
  }
}
