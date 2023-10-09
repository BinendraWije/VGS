// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);


import {createUserRouter} from './Routes/createUser.js';
import {getAllPostsRouter} from'./Routes/Allposts.js';
import {getAllUsersRouter} from './Routes/allUsers.js';
import {getAllForumPostsRouter} from './Routes/allForumposts.js';
import {signInRouter} from './Routes/Signin.js';
import {signOutRouter} from './Routes/Signout.js';
import { refreshTokenRouter } from './Routes/refreshtoken.js';
const bcrypt = require('bcryptjs');
import { verifyJWT } from './Middleware/verifyJWT.js';
const  cookieParser = require('cookie-parser');

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
import { db } from './Config/databaseconfig.js';
import {corsOptions} from './Config/CORSoptions.js';
import {credentials} from './Middleware/credentials.js';
import { handleRefreshTokenrouter } from './Routes/refreshtokenroute.js';
import { deleteUserRouter }from './Routes/deleteUser.js';
import { editUserRouter }from'./Routes/editUser.js';
import {getAllProductsRouter}from './Routes/allProducts.js';
import { createProductRouter } from'./Routes/createProduct.js';
import { getProductRouter } from "./Routes/getProduct.js";

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
app.use(refreshTokenRouter);
app.use(signOutRouter);
// app.use(verifyJWT);
app.use(getAllUsersRouter);
app.use(createUserRouter);
app.use(deleteUserRouter);
app.use(editUserRouter);
app.use(getAllProductsRouter);
app.use(createProductRouter);
app.use(getProductRouter);

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
