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
  , posts.user_id as "userId"
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

async function getPostsByHash(hashtag) {
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
  )
}

async function updatePost(id, message, userId, sharedUrl) {
  console.log("Cheguei aqui",id, message, userId, sharedUrl)
  return db.query(
    `UPDATE posts SET message=$1, shared_url=$2 WHERE user_id=$3 AND id=$4;`,
    [message, sharedUrl, userId, id],
  )
}
const postsRepository = {
  getPosts,
  createPost,
  getLastPost,
  getPostsByHash,
  deletePostById,
  getPostByUserId,
  updatePost,
}

export default postsRepository
