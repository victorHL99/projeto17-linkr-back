import { getTrendingHashtags } from "../repositories/trendingRepository.js";

import sessionsRepository from "../repositories/sessionsRepository.js";

export async function getTrendinds(req, res) {
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();

    const LIMIT_TRENDINGS = 10;

    try {
        const resultVerifyToken = await sessionsRepository.verifyToken(token);

        if(resultVerifyToken.rows.length === 0){
            return res.status(401).send("Token inválido");
        }

        const { rows: trendings} = await getTrendingHashtags(LIMIT_TRENDINGS);

        res.send(trendings);

    } catch(err) {
        return res.status(500).send(err.message);
    }
}