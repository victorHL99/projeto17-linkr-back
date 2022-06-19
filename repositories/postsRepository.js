import SqlString from "sqlstring"

import db from "../config/db.js"

async function getPosts(
  limit,
  order = "created_at",
  direction = "DESC",
  userId,
) {
  const limitClause = limit ? `LIMIT ${SqlString.escape(limit)}` : ""
  const orderClause = order ? `ORDER BY posts.${order} ${direction}` : ""
  const whereClause = userId ? `AND users.id = ${SqlString.escape(userId)}` : ""

  const queryText = `SELECT 
  posts.id
  , posts.message
  , posts.shared_url as "sharedUrl"
  , posts.created_at as "createdAt"
  , users.username
  , users.profile_image as "profileImage"
  , count(likes.post_id)::integer as "likesCount"
  from posts
  LEFT JOIN likes on posts.id = likes.post_id
  JOIN users on users.id = posts.user_id
  WHERE posts.deleted IS NOT true ${whereClause}
  GROUP BY posts.id, users.id
${orderClause}
${limitClause}`

  return db.query(queryText)
}

async function createPost(userId, sharedUrl, message) {
  return db.query(
    `INSERT INTO posts ("user_id", "shared_url", "message") 
          VALUES ($1,$2,$3);
          `,
    [userId, sharedUrl, message],
  )
}

async function getLastPost(message) {
  return db.query(
    `SELECT 
    posts.id
    , posts.message
    , posts.shared_url as "sharedUrl"
    , posts.created_at as "createdAt"
  FROM posts 
  WHERE posts.message = $1 
  LIMIT 1`,
    [message],
  )
}

const postsRepository = {
  getPosts,
  createPost,
  getLastPost,
}

export default postsRepository
