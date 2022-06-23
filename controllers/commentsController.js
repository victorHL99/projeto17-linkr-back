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
        res.send(counter.rows[0])
    } catch (error) {
        verboseConsoleLog("Error:", error)
        return res.sendStatus(500)
    }
}

export async function updateComment(req, res) {
    const { postId } = req.params
    console.log(postId)
    const { userId } = res.locals
    const { message } = req.body 
    try {
       const result = await commentsRepository.updateComment(postId, message, userId)
        res.sendStatus(204, result)
    } catch (e) {
      return res.status(500).send(e.message)
    }
  }
  