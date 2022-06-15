//import bcrypt from 'bcrypt'

import authRepository from "../repositories/authRepository.js";

export const signupMiddleware = async (req, res, next) => {
  const { email } = req.body;
  try {
    const { rows: emails } = await authRepository.getEmail(email);
    const [emailConflict] = emails;
    if (emailConflict) {
      return res.status(422).send("Email already exists!");
    }
    next();
  } catch (e) {
    return res.status(500).send(e.message);
  }
};
