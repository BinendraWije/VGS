const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

const dbconnection =() =>{db.connect(function(err){
   if(err){
   console.log("couldn't connect" + err);
   return  
   }
   console.log("connected to database");
   
})};

module.exports =  { dbconnection, db } ;