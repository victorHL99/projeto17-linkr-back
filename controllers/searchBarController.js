import db from "../config/db.js"

import searchBarRepository from "../repositories/searchBarRepository.js"

export async function getUserBySearch(req, res){
  const {name} = req.params;
  const {token} = res.locals;

  try{
    const resultUsers = await searchBarRepository.getUserByName(name);
    
    res.status(200).send(resultUsers.rows);
    return resultUsers.rows;
  } catch(err){
    return res.status(500).send(err.message);
  }
}