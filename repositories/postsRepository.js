import SqlString from "sqlstring"

import db from "../config/db.js"

async function getPosts(
  limit,
  order = "created_at",
  direction = "DESC",
  userId,
) {
  const limitClause = limit ? `LIMIT ${SqlString.escape(limit)}` : ""
  const orderClause =
    order && direction ? `ORDER BY posts.${order} ${direction}` : ""
  const joinFollowClause = userId
    ? `JOIN follows on p.user_id = follows.followed_id AND follows.follower_id = ${SqlString.escape(
        userId,
      )}`
    : ""

  const joinFollowClauseRepost = userId
    ? `JOIN follows on follows.follower_id = ${SqlString.escape(userId)}`
    : ""

  const queryText = `SELECT
  p.id,
  p.user_id AS "userId",
  u.username,
  u.profile_image as "profileImage",
  p.message, 
  p.shared_url AS "sharedUrl",
  (SELECT
      COUNT(l.post_id)::integer
      FROM likes l
      WHERE l.post_id = p.id) AS "likesCount",
  (SELECT
      COUNT(r2.post_id)::integer
      FROM reposts r2
      WHERE r2.post_id = p.id) AS "repostsCount",
  p.created_at AS "createdAt",
  r.id AS "repostUserId",
  u2.username AS "repostUsername"
  FROM posts p
  JOIN users u ON u.id = p.user_id
  LEFT JOIN reposts r ON r.id = NULL
  LEFT JOIN users u2 ON u2.id = r.user_id
  ${joinFollowClause}
  WHERE p.deleted IS NOT true
  GROUP BY p.id, u.id, r.id, u2.username
  UNION ALL
  SELECT
  r.post_id AS id,
  p.user_id AS "userId",
  u.username,
  u.profile_image as "profileImage",
  p.message, 
  p.shared_url AS "sharedUrl", 
  (SELECT
      COUNT(l.post_id)::integer
      FROM likes l
      WHERE l.post_id = p.id) AS "likesCount",
  (SELECT
      COUNT(r2.post_id)::integer
      FROM reposts r2
      WHERE r2.post_id = p.id) AS "repostsCount",
  r.created_at AS "createdAt", 
  r.user_id AS "repostUserId",
  u2.username AS "repostUsername"
  FROM reposts r
  JOIN posts p ON p.id = r.post_id
  JOIN users u ON u.id = p.user_id
  LEFT JOIN users u2 ON u2.id = r.user_id
  ${joinFollowClauseRepost}
  WHERE p.deleted IS NOT true AND p.user_id != 1
  GROUP BY p.id, u.id, r.post_id, r.created_at, r.user_id, u2.username
  ORDER BY "createdAt" DESC
  ${limitClause}
  `

  return db.query(queryText)
}

async function getPostsFromUserById(
  limit,
  order = "created_at",
  direction = "DESC",
  userId,
) {
  const limitClause = limit ? `LIMIT ${SqlString.escape(limit)}` : ""
  const orderClause =
    order && direction ? `ORDER BY posts.${order} ${direction}` : ""
  const whereClause = userId ? `AND u.id = ${SqlString.escape(userId)}` : ""
  const whereClauseRepost = userId
    ? `AND u2.id = ${SqlString.escape(userId)}`
    : ""

  const queryText = `SELECT
  p.id,
  p.user_id AS "userId",
  u.username,
  u.profile_image as "profileImage",
  p.message, 
  p.shared_url AS "sharedUrl",
  (SELECT
      COUNT(l.post_id)::integer
      FROM likes l
      WHERE l.post_id = p.id) AS "likesCount",
  (SELECT
      COUNT(r2.post_id)::integer
      FROM reposts r2
      WHERE r2.post_id = p.id) AS "repostsCount",
  p.created_at AS "createdAt",
  r.id AS "repostUserId",
  u2.username AS "repostUsername"
  FROM posts p
  JOIN users u ON u.id = p.user_id
  LEFT JOIN reposts r ON r.id = NULL
  LEFT JOIN users u2 ON u2.id = r.user_id
  WHERE p.deleted IS NOT true ${whereClause}
  GROUP BY p.id, u.id, r.id, u2.username
  UNION ALL
  SELECT
  r.post_id AS id,
  p.user_id AS "userId",
  u.username,
  u.profile_image as "profileImage",
  p.message, 
  p.shared_url AS "sharedUrl", 
  (SELECT
      COUNT(l.post_id)::integer
      FROM likes l
      WHERE l.post_id = p.id) AS "likesCount",
  (SELECT
      COUNT(r2.post_id)::integer
      FROM reposts r2
      WHERE r2.post_id = p.id) AS "repostsCount",
  r.created_at AS "createdAt", 
  r.user_id AS "repostUserId",
  u2.username AS "repostUsername"
  FROM reposts r
  JOIN posts p ON p.id = r.post_id
  JOIN users u ON u.id = p.user_id
  LEFT JOIN users u2 ON u2.id = r.user_id
  WHERE p.deleted IS NOT true ${whereClauseRepost}
  GROUP BY p.id, u.id, r.post_id, r.created_at, r.user_id, u2.username
  ORDER BY "createdAt" DESC
  ${limitClause}`

  console.log(queryText)

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

/*async function deleteReposts(id) {
  return db.query(
    `DELETE FROM reposts
    WHERE post_id = $1`,
    [id],
  )
}*/

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
  getPostsFromUserById,
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
