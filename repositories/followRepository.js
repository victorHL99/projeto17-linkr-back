import db from "../config/db.js"

function verifyFollowUser(followerId, followedId) {
  return db.query(
    `
    SELECT * FROM follows
    WHERE follower_id = $1 AND followed_id = $2
    `,
    [followerId, followedId],
  )
}

function followUser(followerId, followedId) {
  return db.query(
    `
    INSERT INTO follows ("follower_id", "followed_id")
    VALUES ($1, $2)
    `,
    [followerId, followedId],
  )
}

function unfollowUser(followerId, followedId) {
  return db.query(
    `
    DELETE FROM follows WHERE follower_id = $1 AND followed_id = $2
    `,
    [followerId, followedId],
  )
}

export const followRepository = {
  verifyFollowUser,
  followUser,
  unfollowUser,
}

export default followRepository
