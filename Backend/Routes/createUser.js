const express = require('express');
const { db } = require('../Config/databaseconfig.js');

const createUserRouter = express.Router();
createUserRouter.post('/createuser',(req,res)=>{
if(!req.body.user_name || !req.body.user_pwd)return res.status(400).json({'message':'Username and password are required.'});
console.log(req.body.user_name);
const findDuplicatesquery = "SELECT * FROM vgsdb.users WHERE `user_name` = ?";
db.query(findDuplicatesquery,[req.body.user_name], (err,data1)=>{
    if(err) return res.json(data1);
    console.log(data1);      
    if(data1.length != 0){
        console.log(data1.length);
        return res.send(data1);      

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

     


})

module.exports =  { createUserRouter } ;