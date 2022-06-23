import db from "../config/db.js"

export async function getComments(id) {
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
    `, [parseInt(id)]);
}

export async function countComments(id) {
    return db.query(`
    SELECT 
    comments.post_id as "postId"
    , count(message) as "commentsCount"
    FROM comments
    WHERE
    post_id = $1
    GROUP BY post_id
    `, [parseInt(id)]);
}