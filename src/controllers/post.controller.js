import pool from "../db.js";

export const getPosts = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM post WHERE id_user = ?", [
      req.user.id,
    ]);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM post WHERE id_user = ? AND id = ?",
      [req.user.id, req.params.id]
    );
    return res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
  }
};

export const postPost = async (req, res) => {
  const { title, password, url } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO post(title, password, url, id_user) VALUES(?,?,?,?)",
      [title, password, url, req.user.id]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (req, res) => {
  try {
    const result = pool.query("DELETE FROM post WHERE id =?", [req.params.id]);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (req, res) => {
  try {
    const result = pool.query(
      "UPDATE post SET title =?, password =?, url =? WHERE id =?",
      [req.body.title, req.body.password, req.body.url, req.params.id]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
