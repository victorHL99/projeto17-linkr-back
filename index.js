import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';

import router from "./routes/index.js";

const app = express();
dotenv.config();

const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(chalk.red(`Mode : ${process.env.MODE || "DEV"}`));
    console.log(chalk.green(`Server is running on port ${port}`));
})