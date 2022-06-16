import pg from 'pg';
import chalk from 'chalk';

const {Pool} = pg;

const user = 'postgres';
const password = '181194';
const host = 'localhost';
const port = 5432;
const database = 'linkr';

const db = new Pool({
    host,
    port,
    user,
    password,
    database,
})

console.log(chalk.green(`DATABASE CONNECTED`));

export default db;