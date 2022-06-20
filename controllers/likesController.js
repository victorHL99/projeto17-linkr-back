import { likesRepository } from "../repositories/likesRepository.js"
import verboseConsoleLog from "./../utils/verboseConsoleLog.js"

export async function isLikedByUser(req, res) {
  const { postId } = req.params
  const { userId } = res.locals

  try {
    const result = await likesRepository.isLikedByUser(userId, postId)

    res.send(!!result.rowCount)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.sendStatus(500)
  }
}

export async function getLikedByWho(req, res) {
  const { postId, limit } = req.query

  try {
    const result = await likesRepository.getLikedByWho(postId, limit)

    res.send(result.rows[0])
  } catch (error) {
    verboseConsoleLog("Error:", error)
    res.sendStatus(500)
  }
}

export async function addLike(req, res) {
  const { postId } = req.params
  const { userId } = res.locals
  try {
    const result = await likesRepository.addLike(userId, postId)

    if (result.rowCount === 1) return res.sendStatus(201)
    else return res.sendStatus(500)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    if (error.code === "23505") return res.sendStatus(409)
    return res.sendStatus(500)
  }
}

export async function deleteLike(req, res) {
  const { postId } = req.params
  const { userId } = res.locals
  try {
    const result = await likesRepository.deleteLike(userId, postId)

    if (result.rowCount === 1) return res.sendStatus(201)
    else return res.sendStatus(500)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.sendStatus(500)
  }
}
