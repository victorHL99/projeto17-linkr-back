import db from "./../config/db.js";
async function insertUserDb(username, email, hashedPassword, profile_image) {
  return db.query(
    `
    INSERT INTO users (username, email, password, profile_image)
    VALUES ($1, $2, $3, $4)`,
    [username, email, hashedPassword, profile_image]
  );
}

async function getEmail(email) {
  return db.query("SELECT email FROM users WHERE email = $1", [email]);
}

const authRepository = {
  insertUserDb,
  getEmail,
};

export default authRepository;
