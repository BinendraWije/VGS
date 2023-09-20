
const createUserRouter = require('./Routes/createUser.js');

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
const db = require('./Config/databaseconfig.js').db;
const app = express();
app.use(cors());
app.use(express.json());

db.getConnection(function(err){
    if(err){
    console.log("couldn't connect" + err);
    return  
    }
    console.log("connected to database");
    
 });

app.get('/posts',(req,res)=>{
    const sql = "SELECT * FROM vgsdb.posts";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        console.log(data);
        return res.json(data);

    })
})

app.get('/users',(req,res)=>{
    const sql = "SELECT * FROM vgsdb.users";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        console.log(data);
        return res.json(data);

    })
})
app.get('/forumposts',(req,res)=>{
    const sql = "SELECT * FROM vgsdb.forumposts";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);

    })
});

app.use(createUserRouter.createUserRouter);

app.listen(3306, ()=>{
    console.log("listening")    
})

 




/*const {createPool} = require("mysql")

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "Jainaisalwaysright11!",
  connectionLimit: 10
})

pool.query(`select * from vgsdb.posts`, (err, res)=>{
  return console.log(res)
})
*/
