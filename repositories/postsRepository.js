import SqlString from "sqlstring"

import db from "../config/db.js"

async function getPosts(limit, order, direction = "DESC") {
  const limitClause = limit ? `LIMIT ${SqlString.escape(limit)}` : ""
  const orderClause = order ? `ORDER BY posts.${order} ${direction}` : ""

  return db.query(
    `SELECT 
    posts.id
    , posts.message
    , posts.shared_url as "sharedUrl"
    , posts.created_at as "createdAt"
    , users.username
    , users.profile_image as "profileImage"
    , count(likes.post_id) as "likesCount"
    from posts
    LEFT JOIN likes on posts.id = likes.post_id
    JOIN users on users.id = posts.user_id
    WHERE posts.deleted IS NOT true
    GROUP BY posts.id, users.id
  ${orderClause}
  ${limitClause}`,
  )
}

async function getPostsByHash(limit, order, direction = "DESC", hashtag) {
  const limitClause = limit ? `LIMIT ${SqlString.escape(limit)}` : ""
  const orderClause = order ? `ORDER BY posts.${order} ${direction}` : ""

  return db.query(
    `SELECT 
    posts.id
    , posts.message
    , posts.shared_url as "sharedUrl"
    , posts.created_at as "createdAt"
    , users.username
    , users.profile_image as "profileImage"
    , count(likes.post_id) as "likesCount"
    from posts
    LEFT JOIN likes on posts.id = likes.post_id
    JOIN users on users.id = posts.user_id
    JOIN posts_hashtags ph ON ph.post_id = posts.id
    JOIN hashtags ON hashtags.id=ph.hashtag_id
    WHERE posts.deleted IS NOT true AND hashtags.id=$1
    GROUP BY posts.id, users.id
  ${orderClause}
  ${limitClause}`,
  [hashtag]
  )
}

const postsRepository = {
  getPosts,
  getPostsByHash,
}

export default postsRepository
