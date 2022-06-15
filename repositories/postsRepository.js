import SqlString from "sqlstring"

import db from "../config/db.js"

async function getPosts(limit, order, direction = "DESC") {
  const limitClause = limit ? `LIMIT ${SqlString.escape(limit)}` : ""
  const orderClause = order ? `ORDER BY posts.${order} ${direction}` : ""

  return db.query(
    `SELECT 
  posts.*
  , array_agg(hashtags.name)
  FROM posts
  
  LEFT JOIN posts_hashtags as ph ON posts.id = ph.post_id
  LEFT JOIN hashtags ON hashtags.id = ph.hashtag_id
  WHERE posts.deleted IS NOT true
  GROUP BY posts.id
  ${orderClause}
  ${limitClause}`,
  )
}

const postsRepository = {
  getPosts,
}

export default postsRepository
