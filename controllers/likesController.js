import db from "./../config/db.js"

import { likesRepository } from "../repositories/likesRepository.js"
import verboseConsoleLog from "./../utils/verboseConsoleLog.js"

export async function addLike(req, res) {
  const { post_id } = req.body
  const user_id = localStorage.getItem("id")
  try {
    await db.query(
      `
        INSERT INTO likes ("user_id","post_id")
        VALUES($1,$2);
        `,
      [user_id, post_id],
    )
    const likes = await db.query(
      `
        SELECT users.username, posts.id as post_id
        FROM likes
        JOIN users ON users.id = likes.user_id
        JOIN posts ON posts.id = likes.post_id
        WHERE likes.post_id=$1
        GROUP BY post_id, posts.id,users.id,users."username"; `,
      [post_id],
    )

    res.status(201).send(likes.rows)
  } catch (error) {
    console.log(error)
    res.status(422).send(error)
  }
}

export async function deleteLike(req, res) {
  const { user_id, post_id } = req.body
  try {
    await db.query(
      `
        DELETE FROM likes WHERE user_id = $1 AND post_id = $2;`,
      [user_id, post_id],
    )

    const likes = await db.query(
      `
        SELECT users.username, posts.id as post_id
        FROM likes
        JOIN users ON users.id = likes.user_id
        JOIN posts ON posts.id = likes.post_id
        WHERE likes.post_id=$1
        GROUP BY post_id, posts.id,users.id,users."username"; `,
      [post_id],
    )

    res.status(201).send(likes.rows)
  } catch (error) {
    res.status(422).send(error)
  }
}

export async function getLikedByWho(req, res) {
  const { postId, limit } = req.query

  try {
    const result = await likesRepository.getLikedByWho(postId, limit)
    console.log("🚀 ~ likesBy", result.rows[0])
    res.send(result.rows[0])
  } catch (error) {
    verboseConsoleLog("Error:", error)
    res.sendStatus(500)
  }
}
