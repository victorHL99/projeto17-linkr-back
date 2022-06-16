import db from "./../config/db.js";


export async function addLike(req, res) {
    const { user_id, post_id } = req.body

    try {
        
        const likes = await db.query(`
        SELECT COUNT("post_id") AS likes
        FROM likes
        WHERE post_id = $1`, [post_id]);
        
        await db.query(`
        INSERT INTO likes ("user_id","post_id")
        VALUES($1,$2);
        `, [
            user_id,
            post_id
        ]);
        console.log("DEU BOM");
        res.status(201).send(likes.rows[0]);

    } catch (error) {
        console.log("DEU RUIM");
        console.log(error)
        res.status(422).send(error)
    }
}

export async function deleteLike(req, res) {

    const { user_id, post_id } = req.body
    try {
        const likes = await db.query(`
        DELETE FROM likes WHERE user_id = $1 AND post_id = $2;`, [user_id, post_id]);

    } catch (error) {
        res.status(422).send(error)
    }
}