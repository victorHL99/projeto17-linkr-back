import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";

import router from "./routes/index.js";

const app = express();

app.use(cors());
app.use(json());
app.use(router);
dotenv.config();

app.get("/", (req, res) => res.send("Online"))

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("")
  console.log(chalk.green(`Server is up and running on port ${port}`))
  console.log(chalk.yellow(`Mode: ${process.env.MODE || "not defined -> DEV"}`))
  console.log(chalk.yellow(`Verbose: ${process.env.VERBOSE || "false"}`))
  console.log("---------------------------------------")
})
