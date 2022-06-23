import userRepository from "../repositories/userRepository.js"
import verboseConsoleLog from "../utils/verboseConsoleLog.js"
import followRepository from "../repositories/followRepository.js"

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

export async function getUserByUsername(req, res) {
  const { username } = req.query

  try {
    const resultUsers = await userRepository.getUserByUsername(username)
    verboseConsoleLog("Result:", resultUsers.rows)
    return res.status(200).send(resultUsers.rows)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.status(500).send(error)
  }
}

//TODO - implementar messagens em ingles
export async function followUser(req, res) {
  const { userId } = res.locals
  const { followedId } = req.params

  if (userId !== followedId) {
    try {
      const resultVerifyFollow = await followRepository.verifyFollowUser(
        userId,
        followedId,
      ) // resultado da query se existe ou não // TODO - TESTAR
      if (resultVerifyFollow.rows > 0) {
        return res
          .status(400)
          .send({ message: "Usuário já seguido" }, resultFollow.rows)
      } else {
        const resultFollow = await followRepository.followUser(
          userId,
          followedId,
        ) // QUERY PARA INSERIR NO BANCO NOVO SEGUIDOR // TODO - TESTAR
        return res
          .status(201)
          .send(
            { message: "Usuário seguido com sucesso", following: true },
            resultFollow.rows,
          )
      }
    } catch (error) {
      verboseConsoleLog("Error:", error)
      return res.status(500).send(error)
    }
  } else {
    return res.status(400).send({ message: "Não é possível seguir você mesmo" })
  }
}

export async function unfollowUser(req, res) {
  const { userId } = res.locals
  const { followedId } = req.params

  if (userId !== followedId) {
    try {
      const resultUnfollow = await followRepository.unfollowUser(
        userId,
        followedId,
      ) // QUERY PARA DELETAR O SEGUIDOR // TODO - TESTAR
      return res
        .status(200)
        .send({ message: "Usuário desseguido com sucesso", following: false })
    } catch (error) {
      verboseConsoleLog("Error:", error)
      return res.status(500).send(error)
    }
  }
}

export async function getFollowCount(req, res) {
  const { userId } = res.locals
  try {
    const followCount = await userRepository.getFollowCount(userId)

    if (!followCount.rowCount) return res.sendStatus(204)
    else return res.send(followCount.rows[0].followCount)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.sendStatus(500)
  }
}
