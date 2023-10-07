// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const jwt = require('jsonwebtoken');
require('dotenv').config();


const verifyJWT = (req,res,next) =>{
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log("Bearer token: " + authHeader.startsWith('Bearer '));
    if(!authHeader && !authHeader.startsWith('Bearer ')) return res.sendStatus(401); //Unauthorized
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err) return res.sendStatus(403); //Forbidden invalid token 
            req.user_name = decoded.UserInfo.user_name;
            req.user_role = decoded.UserInfo.user_role;
            next();
        }
    )
}

module.exports = { verifyJWT }