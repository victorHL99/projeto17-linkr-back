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

  const queryText = `
  SELECT
  p.id,
  p.user_id AS "userId",
  u.username,
  u.profile_image as "profileImage",
  p.message, 
  p.shared_url AS "sharedUrl",
  COUNT(l.post_id)::integer AS "likesCount",
  COUNT(r2.post_id)::integer AS "repostsCount",
  p.created_at AS "createdAt",
  r.id AS "repostUserId"
  FROM posts p
  LEFT JOIN reposts r ON r.id = NULL
  LEFT JOIN reposts r2 ON r2.post_id = p.id
  LEFT JOIN likes l ON p.id = l.post_id
  JOIN users u ON u.id = p.user_id
  WHERE p.deleted IS NOT true ${whereClause}
  GROUP BY p.id, u.id, r.id
  UNION ALL
  SELECT
  r.post_id AS id,
  p.user_id AS "userId",
  u.username,
  u.profile_image as "profileImage",
  p.message, 
  p.shared_url AS "sharedUrl", 
  COUNT(l.post_id)::integer AS "likesCount",
  COUNT(r.post_id)::integer AS "repostsCount",
  r.created_at AS "createdAt", 
  r.user_id AS "repostUserId"
  FROM reposts r
  JOIN posts p ON p.id = r.post_id
  JOIN users u ON u.id = p.user_id
  LEFT JOIN likes l ON r.post_id = l.post_id
  WHERE p.deleted IS NOT true ${whereClause}
  GROUP BY p.id, u.id, r.post_id, r.created_at, r.user_id
  ORDER BY "createdAt" DESC
  ${limitClause}
  `

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
  ORDER BY posts.id DESC
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

async function getHashtagByName(hashtag) {
  return db.query(
    `SELECT * 
    FROM hashtags 
    WHERE hashtags.name = $1`,
    [hashtag],
  )
}

async function getAllHashtags() {
  return db.query(
    `SELECT * 
    FROM hashtags`,
  )
}

async function createHashtags(hashtags) {
  const valuesText = hashtags.reduce((acc, hashtag, index) => {
    if (index === hashtags.length - 1)
      return (acc += `(${SqlString.escape(hashtag)})`)
    else return (acc += `(${SqlString.escape(hashtag)}), `)
  }, "")

  const queryText = `INSERT INTO 
  hashtags (name) 
  VALUES ${valuesText}
  RETURNING id`

  return db.query(queryText)
}

async function createRelationHashtagPost(postId, hashtagId) {
  const queryText = `INSERT INTO 
  posts_hashtags (post_id, hashtag_id) 
  VALUES (${postId}, ${hashtagId})
  RETURNING id`

  return db.query(queryText)
}

async function updatePost(id, message, userId) {
  return db.query(
    `UPDATE posts
  SET  message =$2
  WHERE id=$1 AND user_id=$3`,
    [id, message, userId],
  )
}

const postsRepository = {
  getPosts,
  createPost,
  getLastPost,
  getPostsByHash,
  deletePostById,
  getPostByUserId,
  getHashtagByName,
  createHashtags,
  getAllHashtags,
  createRelationHashtagPost,
  updatePost,
}

export default postsRepository
