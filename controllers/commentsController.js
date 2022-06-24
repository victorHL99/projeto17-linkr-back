import commentsRepository from "../repositories/commentsRepository.js"

import verboseConsoleLog from "./../utils/verboseConsoleLog.js"

export async function listComments(req, res) {
  const { postId } = req.params

  try {
    const comments = await commentsRepository.getComments(postId)
    res.send(comments.rows)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.sendStatus(500)
  }
}

export async function commentsCounter(req, res) {
  const { postId } = req.params

  try {
    const counter = await commentsRepository.countComments(postId)
    const comments = counter.rowCount.toString()
    return res.status(200).send(comments)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.sendStatus(500)
  }
}

export async function getFollows(req, res) {
  const { userId } = req.params

  try {
    const { rows: follows } = await commentsRepository.listFollows(userId)

    const list = follows.map((follow) => {
      return follow.followedId
    })

    res.send(list)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.sendStatus(500)
  }
}

export async function insertComment(req, res) {
  const { postId } = req.params
  const { userId } = res.locals
  const { message } = req.body
  try {
    const result = await commentsRepository.insertComment(
      postId,
      userId,
      message,
    )
    res.sendStatus(204, result)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.status(500).send(error.message)
  }
}
