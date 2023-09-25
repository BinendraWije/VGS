const jwt = require('jsonwebtoken');
require('dotenv').config();


const verifyJWT = (req,res,next) =>{
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log("I'm here after getting the authHeaders which are " + authHeader);
    if(!authHeader && !authHeader.startsWith('Bearer ')) return res.sendStatus(401); //Unauthorized
    console.log("I'm here after checking the  Bearer token");
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