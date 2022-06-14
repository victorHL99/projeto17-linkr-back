import db from "../db.js";

async function insertUserDb(username, email, hashedPassword, profile_image) {
  return db.query(
    `
    INSERT INTO users (username, email, password, profile_image)
    VALUES ($1, $2, $3, $4)`,
    [username, email, hashedPassword, profile_image]
  );
}

const authRepository = {
  insertUserDb,
};

export default authRepository;
