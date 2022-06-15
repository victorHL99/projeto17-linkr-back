import SqlString from "sqlstring"

import db from "../config/db.js"

async function getPosts(limit, order, direction = "DESC") {
  const limitClause = limit ? `LIMIT ${SqlString.escape(limit)}` : ""
  const orderClause = order ? `ORDER BY posts.${order} ${direction}` : ""

  return db.query(
    `SELECT 
    posts.id
    , posts.message
    , posts.shared_url
    , posts.created_at
    , users.username
    , users.profile_image
    , count(likes.post_id) as likes_count
    from posts
    LEFT JOIN likes on posts.id = likes.post_id
    JOIN users on users.id = posts.user_id
    WHERE posts.deleted IS NOT true
    GROUP BY posts.id, users.id
  ${orderClause}
  ${limitClause}`,
  )
}

const postsRepository = {
  getPosts,
}

export default postsRepository
