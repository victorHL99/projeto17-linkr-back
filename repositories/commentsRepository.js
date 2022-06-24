import db from "../config/db.js"

async function getComments(id) {
  return db.query(`
    SELECT 
    comments.id
    , comments.post_id as "postId"
    , comments.user_id as "userId"
    , comments.message
    , users.profile_image as "userImage"
    , users.username
    FROM comments
    JOIN users ON users.id=comments.user_id
    WHERE
    post_id = $1
    order by comments.created_at 
    `, [parseInt(id)]);
}

async function countComments(id) {
  return db.query(`
    SELECT 
    comments.post_id as "postId"
    FROM comments
    WHERE
    post_id = $1
    `, [parseInt(id)]);
}


async function insertComment(id, message, userId) {
  return db.query(`INSERT INTO comments
    (post_id, user_id, message)
    VALUES ($1, $2, $3)`, [id, userId, message])
}

const commentsRepository = {
  insertComment,
  getComments,
  countComments,
  listFollows
}

export default commentsRepository;

async function listFollows(id) {
  return db.query(`
    SELECT 
    followed_id as "followedId"
    FROM follows 
    WHERE
    follower_id=$1
    `, [parseInt(id)])
}