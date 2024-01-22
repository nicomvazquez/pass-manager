import pool from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const [isExist] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (isExist.length > 0) {
      res.status(401).json({ error: "user already exist" });
    }

    const passwordhash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO user(username, email, password) VALUES (?,?,?)",
      [username, email, passwordhash]
    );

    jwt.sign(
      { id: result.insertId },
      TOKEN_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) console.log(err);
        res.cookie("token", token);
        res.status(200).json({
          id: result.insertId,
          email,
          username,
          password,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [userFound] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (userFound.length === 0) {
      res.status(401).json({ error: "user not fount" });
    }

    const isMatch = await bcrypt.compare(password, userFound[0].password);
    if (!isMatch) {
      res.status(401).json({ error: "incorrect password" });
    }

    jwt.sign(
      { id: userFound[0].id },
      TOKEN_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) console.log(err);
        res.cookie("token", token);
        res.status(200).json(userFound[0]);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const [result] = await pool.query("SELECT * FROM users WHERE id = ?", [
    req.user.id,
  ]);

  if (result.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json(result[0]);
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);
    console.log(user)

    const [userFound] = await pool.query("SELECT * FROM users WHERE id = ?", [user.id]);
    if (!userFound) return res.sendStatus(401);
    console.log(userFound)

    return res.json({
      id: userFound[0].id,
      username: userFound[0].username,
      email: userFound[0].email,
    });
  });
};  