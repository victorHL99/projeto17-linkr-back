import db from "./../config/db.js";


export async function addLike(req, res) {
    
    const { post_id } = req.body
    const { userId } = res.locals
    console.log({post_id, userId})
    try {

        await db.query(`
        INSERT INTO likes ("user_id","post_id")
        VALUES($1,$2);
        `, [
            userId,
            post_id
        ]);
        const likes = await db.query(`
        SELECT users.username, posts.id as post_id
        FROM likes
        JOIN users ON users.id = likes.user_id
        JOIN posts ON posts.id = likes.post_id
        WHERE likes.post_id=$1
        GROUP BY post_id, posts.id,users.id,users."username"; `, [post_id]);

        res.status(201).send(likes.rows);

    } catch (error) {

        console.log(error)
        res.status(422).send(error)
    }
}

export async function deleteLike(req, res) {

    const { post_id } = req.params
    const { userId } = res.locals
    console.log({post_id, userId})
    try {
        await db.query(`
        DELETE FROM likes WHERE user_id = $1 AND post_id = $2;`, [userId, post_id]);

        const likes = await db.query(`
        SELECT users.username, posts.id as post_id
        FROM likes
        JOIN users ON users.id = likes.user_id
        JOIN posts ON posts.id = likes.post_id
        WHERE likes.post_id=$1
        GROUP BY post_id, posts.id,users.id,users."username"; `, [post_id]);

        res.status(201).send(likes.rows);

    } catch (error) {
        res.status(422).send(error)
    }
}