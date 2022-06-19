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

<<<<<<< HEAD
async function createPost(userId, sharedUrl, message) {
  return db.query(
    `INSERT INTO posts ("user_id", "shared_url", "message") 
          VALUES ($1,$2,$3);
          `,
    [userId, sharedUrl, message],
  )
}

async function getLastPost(message) {
=======
async function getPostsByHash(hashtag) {
>>>>>>> 41d8e8234281dc2d542877c5eca10d818b30b3d5
  return db.query(
    `SELECT 
    posts.id
    , posts.message
    , posts.shared_url as "sharedUrl"
    , posts.created_at as "createdAt"
<<<<<<< HEAD
  FROM posts 
  WHERE posts.message = $1 
  LIMIT 1`,
    [message],
=======
    , users.username
    , users.profile_image as "profileImage"
    , count(likes.post_id) as "likesCount"
    from posts
    LEFT JOIN likes on posts.id = likes.post_id
    JOIN users on users.id = posts.user_id
    JOIN posts_hashtags ph ON ph.post_id = posts.id
    JOIN hashtags ON hashtags.id=ph.hashtag_id
    WHERE posts.deleted IS NOT true AND hashtags.name=$1
    GROUP BY posts.id, users.id
    ORDER BY posts.created_at DESC
    LIMIT 20`,
    [hashtag],
  )
}

async function deletePostById(id) {
  return db.query(
    `UPDATE posts SET deleted=true
    WHERE id = $1`,
    [id],
  )
}

async function getPostByUserId(userId, id) {
  return db.query(
    `SELECT id FROM posts 
    WHERE "user_id" = $1 AND id = $2`,
    [userId, id],
>>>>>>> 41d8e8234281dc2d542877c5eca10d818b30b3d5
  )
}

const postsRepository = {
  getPosts,
<<<<<<< HEAD
  createPost,
  getLastPost,
=======
  getPostsByHash,
  deletePostById,
  getPostByUserId,
>>>>>>> 41d8e8234281dc2d542877c5eca10d818b30b3d5
}

export default postsRepository
