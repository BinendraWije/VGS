const express = require('express');
const { db } = require('../Config/databaseconfig.js');
const bcrypt = require('bcryptjs');

const signInRouter = express.Router();
signInRouter.post('/auth', async (req,res)=>{
if(!req.body.user_name || !req.body.user_pwd)return res.status(400).json({'message':'Username and password are required.'});
const user = req.body.user_name;
// Checking if username exists
const findDuplicatesquery = "SELECT * FROM vgsdb.users WHERE `user_name` = ?";
db.query(findDuplicatesquery,[user], async (err,results)=>{
    if(err) return res.json(err);         
    if(results.length == 0 ) return res.sendStatus(401); //Unauthorized
    console.log(req.body.user_pwd);
    console.log(results[0].user_pwd);
    // evaluate password
    const match = await bcrypt.compare(req.body.user_pwd, results[0].user_pwd);
    if(match){
        // create JWT
        res.json({'success': `User ${user} is loggedin!`});
    }else{
        res.sendStatus(401);
    }

    
})


});

module.exports =  { signInRouter } ;