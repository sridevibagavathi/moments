require("dotenv").config();
import { Pool } from "pg";
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

const pgConnection = async (query) => {
  const res = await pool.query(query);
  return res;
};

export default pgConnection;
