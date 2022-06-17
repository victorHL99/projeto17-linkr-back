import userRepository from "../repositories/userRepository.js"
import verboseConsoleLog from "../utils/verboseConsoleLog.js"

export async function getUser(req, res) {
  const { userId } = req.params

  try {
    const result = await userRepository.getUserById(userId)
    verboseConsoleLog("Result:", result.rows)
    return res.send(result.rows[0])
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.sendStatus(500)
  }
}
