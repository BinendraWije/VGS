// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
import { db } from '../Config/databaseconfig.js';
import { verifyRoles } from '../Middleware/verifyRoles.js';

export const editUserRouter = express.Router();
editUserRouter.post('/edituser/:username', async (req,res)=>{
if(!req.body.user_name || !req.body.user_pwd)return res.status(400).json({'message':'Username and password are required.'});

// Checking if username exists
const findDuplicatesquery = "SELECT * FROM vgsdb.users WHERE `user_name` = ?";
db.query(findDuplicatesquery,[req.params.username], async (err,results)=>{
    if(err) return res.json(err);         
    if(results.length > 0 ){
        // updating  into the database
        const q = "UPDATE vgsdb.users SET user_name = ?, user_pwd = ?, user_role = ? WHERE user_name = ?";

        db.query(q,[req.body.user_name, req.body.user_pwd, req.body.user_role, req.params.username], async (err,data)=>{
                  if(err) return res.json(err);      
                  return res.json("user successfully edited");
          
              })
    }
})




});

