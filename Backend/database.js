
const {createUserRouter} = require('./Routes/createUser.js');
const {getAllPostsRouter} = require('./Routes/Allposts.js');
const {getAllUsersRouter} = require('./Routes/allUsers.js');
const {getAllForumPostsRouter} = require('./Routes/allForumposts.js');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
const { db } = require('./Config/databaseconfig.js');
const app = express();

app.use(cors());
app.use(express.json());

db.connect(function(err){
    if(err){
    console.log("couldn't connect" + err);
    return  
    }
    console.log("connected to database");
    
 });

 // Frontend Routes
app.use(getAllPostsRouter);
app.use(getAllForumPostsRouter);


// Adminpanel Routes
app.use(getAllUsersRouter);
app.use(createUserRouter);

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
