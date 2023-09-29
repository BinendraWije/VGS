const express = require('express');
const { db } = require('../Config/databaseconfig.js');
const { verifyRoles } = require('../Middleware/verifyRoles.js');

const editUserRouter = express.Router();
editUserRouter.post('/edituser/:username', verifyRoles('Admin'), async (req,res)=>{
if(!req.body.user_name || !req.body.user_pwd)return res.status(400).json({'message':'Username and password are required.'});

// Checking if username exists
const findDuplicatesquery = "SELECT * FROM vgsdb.users WHERE `user_name` = ?";
db.query(findDuplicatesquery,[req.params.username], async (err,results)=>{
    if(err) return res.json(err);         
    if(results.length > 0 ){
        return res.sendStatus(409);    

    }
})

  // inserting into the database

const q = "UPDATE vgsdb.users SET user_name = ?, user_pwd = ?, user_role = ? WHERE user_name = ?";

db.query(q,[req.body.user_name, req.body.user_pwd, req.body.user_role, req.params.username], async (err,data)=>{
          if(err) return res.json(err);      
          return res.json("user successfully edited");
  
      })

});

module.exports =  { editUserRouter } ;