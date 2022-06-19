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

  console.log("🚀 ~ queryText", queryText)

  return db.query(queryText)
}

const postsRepository = {
  getPosts,
}

export default postsRepository
