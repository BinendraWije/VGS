// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
const { db } = require('../Config/databaseconfig.js');
const { verifyRoles } = require('../Middleware/verifyRoles.js');

const getUserRouter = express.Router();
getUserRouter.post('/getuser', async (req,res)=>{

// Checking if username exists
const findDuplicatesquery = "SELECT * FROM vgsdb.users WHERE `user_name` = ?";
db.query(findDuplicatesquery,[req.body.user_name], async (err,results)=>{
    if(err) return res.json(err);
    res.json(results)         
   
})

});

module.exports =  { getUserRouter } ;