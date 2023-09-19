import { Router } from "express";
import { userSchema } from '../Model/register_user_schema.js';
import {validateRequestSchema} from '../Middleware/validate_schema_requests.js';



const createUserRouter = Router();
createUserRouter.post('/createuser',
userSchema,
validateRequestSchema,
(req,res)=>{
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

export {createUserRouter as createUserRouter}