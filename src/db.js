import pg from "pg";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./config.js";

const { Pool } = pg;

const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_NAME,
});

if (pool) {
  console.log("db is conected");
  console.log(pool)
}

export default pool;
