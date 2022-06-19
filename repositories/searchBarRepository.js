import db from "../config/db.js";

async function getUserByName(name) {
  return(
    db.query(db.query(`
    SELECT username AS "userName",
    id AS "userId",
    profile_image AS "profileImage"
    from users 
    WHERE username 
    LIKE '%$1%'`,[name]))
  )
}

const searchBarRepository = {
  getUserByName,
}

export default searchBarRepository;