const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors({
   origin: 'http://13.50.5.212',
   optionsSuccessStatus: 200
}));


const db = mysql.createConnection({
    host:"13.50.5.212",
    port:"3306",
    user: "root",
    password: "Jainasalwaysright11!",
    database: "vgsdb"
})

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
