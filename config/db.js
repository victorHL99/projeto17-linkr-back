import pg from "pg"
import dotenv from "dotenv"
dotenv.config()


const { Pool } = pg

const devConfig = {
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
}

const prodConfig = { connectionString: process.env.DATABASE_URL }

if (process.env.MODE === "PROD") {
  prodConfig.ssl = {
    rejectUnauthorized: false,
  }
}

const db = new Pool(process.env.MODE === "PROD" ? prodConfig : devConfig)

export default db; 


