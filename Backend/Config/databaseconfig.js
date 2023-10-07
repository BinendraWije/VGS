// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

module.exports =  { db } ;