import { getComments } from "../repositories/commentsRepository.js"

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