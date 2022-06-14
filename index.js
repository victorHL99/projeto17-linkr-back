import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';

const app = express();

const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(chalk.green(`Server is running on port ${port}`));
})