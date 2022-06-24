import userRepository from "../repositories/userRepository.js"
import verboseConsoleLog from "../utils/verboseConsoleLog.js"
import followRepository from "../repositories/followRepository.js"

export async function getUser(req, res) {
  const { userId } = req.params

  try {
    const result = await userRepository.getUserById(userId)
    return res.send(result.rows[0])
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.sendStatus(500)
  }
}

export async function getUserByUsername(req, res) {
  const { username } = req.query
  const { userId } = res.locals

  try {
    const resultUsers = await userRepository.getUserByUsername(username, userId)
    return res.status(200).send(resultUsers.rows)
  } catch (error) {
    verboseConsoleLog("Error:", error)
    return res.status(500).send(error)
  }
}

export async function followUser(req, res) {
  const { followedId } = req.params
  const { followerId } = req.body

  if (followedId !== followerId) {
    try {
      const resultByVerifyFollow = await followRepository.verifyFollowUser(
        followerId,
        followedId,
      )
      if (resultByVerifyFollow.rows.length === 0) {
        const resultFollow = await followRepository.followUser(
          followerId,
          followedId,
        )
        return res.status(200).send(resultFollow.rows)
      } else {
        return res.status(400).send("You already follow this user")
      }
    } catch (error) {
      verboseConsoleLog("Error:", error)
      return res.sendStatus(500)
    }
  } else {
    return res.status(400).send("You can't follow yourself")
  }
}

export async function unfollowUser(req, res) {
  const { followedId } = req.params
  const { userId } = res.locals

  if (followedId !== userId) {
    try {
      const resultUnfollow = await followRepository.unfollowUser(
        userId,
        followedId,
      )
      return res.status(200).send(resultUnfollow.rows)
    } catch (error) {
      verboseConsoleLog("Error:", error)
      return res.sendStatus(500)
    }
  } else {
    return res.status(400).send("You can't unfollow yourself")
  }
}

export async function getFollowState(req, res) {
  const { userId } = res.locals
  const { followedId } = req.params

  try {
    const resultFollow = await followRepository.verifyFollowUser(
      userId,
      followedId,
    )
    if (resultFollow.rows.length === 0) {
      return res.status(200).send({ followState: false })
    }
    return res.status(200).send({ followState: true })
  } catch (error) {
    verboseConsoleLog("Error:", error)
    res.status(500).send({ followState: false })
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
