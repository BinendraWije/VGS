const express = require('express');
const { db } = require('../Config/databaseconfig.js');

const createUserRouter = express.Router();
createUserRouter.post('/createuser',(req,res)=>{
if(!req.body.user_name || !req.body.user_pwd)return res.status(400).json({'message':'Username and password are required.'});
const usernameforduplicatechecking = (req.body.user_name).toString();
const findDuplicatesquery = "SELECT * FROM vgsdb.users WHERE `user_name` = ?";
const [duplicate] = db.query(findDuplicatesquery,[usernameforduplicatechecking])
    if(duplicate[0] != undefined){
        console.log(data1.length);
        return res.sendStatus(409)   //conflict

    }else{

        const q = "INSERT INTO vgsdb.users (`user_name`,`user_pwd`,`user_role`) VALUES(?)";
        const values = [
            req.body.user_name,
            req.body.user_pwd,
            req.body.user_role,
            ]
        db.query(q,[values], (err,data)=>{
                if(err) return res.json(err);      
                return res.json("user successfully created");
        
            })
    };
})

     


module.exports =  { createUserRouter } ;