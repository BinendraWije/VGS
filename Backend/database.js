const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());


const db = mysql.createConnection({
    host:"16.170.240.192",
    port:"3306",
    user: "main",
    password: "Newpass11",
    database: "vgsdb"
})
db.connect(function(err){
   if(err){
   console.log("couldn't connect");
   return  
   }
   console.log("connected to database");
   
});
app.get('/',(req,res)=>{
    return res.json("from Backend")
})

app.get('/posts',(req,res)=>{
    const sql = "SELECT * FROM vgsdb.posts";
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
})

app.listen(3000, ()=>{
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
