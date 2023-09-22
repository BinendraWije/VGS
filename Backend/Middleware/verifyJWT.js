const jwt = require('jsonwebtoken');
require('dotenv').config();


const verifyJWT = (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.sendStatus(401); //Unauthorized
    console.log(authHeader); //Bearer Token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err) return res.sendStatus(403); //Forbidden invalid token 
            req.user_name = decoded.user_name;
            next();
        }
    )
}

module.exports = { verifyJWT }