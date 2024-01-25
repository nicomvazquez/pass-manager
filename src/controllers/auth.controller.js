import pool from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const { rows: isExist } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (isExist.length > 0) {
      res.status(401).json({ error: "user already exists" });
    }

    const passwordhash = await bcrypt.hash(password, 10);

    const { rows: result } = await pool.query(
      "INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING id",
      [username, email, passwordhash]
    );

    jwt.sign(
      { id: result[0].id },
      TOKEN_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) console.log(err);
        res.cookie("token", token);
        res.status(200).json({
          id: result[0].id,
          email,
          username,
          password: passwordhash,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { rows: userFound } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (userFound.length === 0) {
      res.status(401).json({ error: "user not found" });
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
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  try {
    const { rows: result } = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.user.id,
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const { rows: userFound } = await pool.query("SELECT * FROM users WHERE id = $1", [user.id]);

    if (!userFound[0]) return res.sendStatus(401);

    return res.json({
      id: userFound[0].id,
      username: userFound[0].username,
      email: userFound[0].email,
    });
  });
};
