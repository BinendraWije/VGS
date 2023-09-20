const express = require('express');
const {validateRequestSchema} = require('../Middleware/validate_schema_requests.js');
const { user_schema } = require('../Model/register_user_schema.js');
const { db } = require('../Config/databaseconfig.js');

const createUserRouter = express.Router();
createUserRouter.post('/createuser',
user_schema,
validateRequestSchema,
(req,res)=>{
    console.log('heere in th createroute');
if(!req.body.user_name || !req.body.user_pwd)return res.status(400).json({'message':'Username and password are required.'});

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
})

module.exports =  { createUserRouter } ;