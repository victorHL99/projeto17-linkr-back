import db from "./../config/db.js";

async function getIdUserByToken(token){
    return db.query(`
        SELECT users.id 
        FROM users
        JOIN sessions
        ON sessions."user_id" = users.id
        WHERE sessions.token = $1`, [token]);
};

const userRepository = {
    getIdUserByToken,
}

export default userRepository;