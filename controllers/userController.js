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

export async function getUserBySearch(req, res){
  const {name} = req.params;

  try{
    const resultUsers = await userRepository.getUserByName(name);
    verboseConsoleLog("Result:", resultUsers.rows)
    return res.status(200).send(resultUsers.rows);
  } catch(error){
    verboseConsoleLog("Error:", error)
    return res.sendStatus(500);
  }
}