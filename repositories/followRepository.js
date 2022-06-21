import db from "../config/db.js"

function verifyFollowUser(userId, followedId) {
  return db.query(
    `
    SELECT * FROM follows
    WHERE follower_id = $1 AND followed_id = $2
    `,
    [userId, followedId],
  )
}

function followUser(userId, followedId) {
  return db.query(
    `
    INSERT INTO follows ("follower_id", "followed_id")
    VALUES ($1, $2)
    `,
    [userId, followedId],
  )
}

export const followRepository = {
  verifyFollowUser,
  followUser,
}

export default followRepository
