
const {createUserRouter} = require('./Routes/createUser.js');
const {getAllPostsRouter} = require('./Routes/Allposts.js');
const {getAllUsersRouter} = require('./Routes/allUsers.js');
const {getAllForumPostsRouter} = require('./Routes/allForumposts.js');
const {signInRouter} = require('./Routes/Signin.js');
const {signOutRouter} = require('./Routes/Signout.js');
const { refreshTokenRouter } = require('./Routes/refreshtoken.js');
const bcrypt = require('bcryptjs');
const { verifyJWT } = require('./Middleware/verifyJWT.js');
const  cookieParser = require('cookie-parser');

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
const { db } = require('./Config/databaseconfig.js');
const corsOptions = require('./Config/CORSoptions.js');
const credentials = require('./Middleware/credentials.js');
const { handleRefreshTokenrouter } = require('./Routes/refreshtokenroute.js');

const app = express();

//Setting Credentials
app.use(credentials);


// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// middleware for json data
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

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
app.use(signInRouter);
app.use(handleRefreshTokenrouter);
app.use(signOutRouter);
app.use(verifyJWT);
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
