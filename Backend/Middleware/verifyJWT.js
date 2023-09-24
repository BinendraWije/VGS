const jwt = require('jsonwebtoken');
require('dotenv').config();


const verifyJWT = (req,res,next) =>{
    const authHeader = req.headers.authorization || req.headers.Authorization;
    //if(!authHeader && !authHeader.startsWith('Bearer ')) return res.sendStatus(401); //Unauthorized
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
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