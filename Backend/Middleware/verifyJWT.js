// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const jwt = require('jsonwebtoken');
require('dotenv').config();


export const verifyJWT = (req,res,next) =>{
    //const authHeader = req.headers.authorization || req.headers.Authorization || req.headers['authorization'] || req.headers['Authorization'] ;
    console.log(req.headers)
    console.log(req.body.accessToken)
    const authHeader = req.body.accessToken    
    if(!authHeader) return res.sendStatus(401); //Unauthorized  && !authHeader.startsWith('jwt ')
    const token = authHeader//authHeader.split('jwt=')[1];
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

