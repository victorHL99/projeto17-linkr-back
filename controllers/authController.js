import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import authRepository from "../repositories/authRepository.js";

export const postUser = async (req, res) => {
  const { username, email, password, profile_image } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    await authRepository.insertUserDb(
      username,
      email,
      hashedPassword,
      profile_image
    );
    res.sendStatus(201);
  } catch (e) {
    return res.status(500).send(e.message);
  }
};
