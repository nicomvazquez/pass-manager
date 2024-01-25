import pool from "../db.js";

export const getPosts = async (req, res) => {
  try {
    const { rows: result } = await pool.query(
      "SELECT * FROM post WHERE id_user = $1",
      [req.user.id]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPost = async (req, res) => {
  try {
    const { rows: result } = await pool.query(
      "SELECT * FROM post WHERE id_user = $1 AND id = $2",
      [req.user.id, req.params.id]
    );
    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postPost = async (req, res) => {
  const { title, password, url } = req.body;
  try {
    const { rows: result } = await pool.query(
      "INSERT INTO post(title, password, url, id_user) VALUES($1, $2, $3, $4) RETURNING *",
      [title, password, url, req.user.id]
    );
    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { rows: result } = await pool.query(
      "DELETE FROM post WHERE id = $1",
      [req.params.id]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { rows: result } = await pool.query(
      "UPDATE post SET title = $1, password = $2, url = $3 WHERE id = $4 RETURNING *",
      [req.body.title, req.body.password, req.body.url, req.params.id]
    );
    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
