import { getComments, countComments } from "../repositories/commentsRepository.js"

import verboseConsoleLog from "./../utils/verboseConsoleLog.js"

export async function listComments(req, res) {
    const { postId } = req.params

    try {
        const comments = await getComments(postId)

        res.send(comments.rows)
    } catch (error) {
        verboseConsoleLog("Error:", error)
        return res.sendStatus(500)
    }
}

export async function commentsCounter(req, res) {
    const { postId } = req.params

    try {
        const counter = await countComments(postId)

        res.send(counter.rows[0])
    } catch (error) {
        verboseConsoleLog("Error:", error)
        return res.sendStatus(500)
    }
}