import db from "./../config/db.js";

import sessionsRepository from "../repositories/sessionsRepository.js";
import userRepository from "../repositories/userRepository.js";

export async function createPublish(req, res){
    console.log("passou aq")
    const {shared_url, message} = req.body;
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();

    try {
        //verify token
        const resultVerifyToken = await sessionsRepository.verifyToken(token);

        if(resultVerifyToken.rows.length === 0){
            return res.status(401).send("Token inválido");
        }

        //get id user
        const resultGetIdUser = await userRepository.getIdUserByToken(token);

        await db.query(`
            INSERT INTO posts ("user_id", "shared_url", "message")
            VALUES ($1,$2,$3)`, [resultGetIdUser.rows[0].id, shared_url, message]);

        return res.status(201).send("Publicação criada com sucesso");
    }
    catch(err){
        return res.status(500).send(err.message);
    }
}