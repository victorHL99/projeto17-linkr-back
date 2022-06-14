// CONFIGURAÇÕS PARA SUBIR PARA O HEROKU
/*
import pg from 'pg';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const {Pool} = pg;

const database = {
    connectionString: process.env.DATABASE_URL,
}

if(process.env.MODE === "PROD"){
    databaseConfig.ssl ={
        rejectUnauthorized: false
    }
}

const db = new Pool(databaseConfig)

export default db;
*/

// CONFIGURAÇÕES PARA TESTAR LOCAL


import pg from 'pg';
import chalk from 'chalk';

const {Pool} = pg;

const user = 'postgres';
const password = '164902';
const host = '127.0.0.1';
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
