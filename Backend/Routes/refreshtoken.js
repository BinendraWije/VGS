const express = require('express');
const { db } = require('../Config/databaseconfig.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const refreshTokenRouter = express.Router();
refreshTokenRouter.get('/refreshtoken', async (req,res)=>{
const cookies = req.cookies;
if(!cookies && !cookies.jwt) return res.sendStatus(401); // unauthorized;
 const refreshToken = cookies.jwt;

// Searching for a user based on refresh_token exists
const findUserFromToken = "SELECT * FROM vgsdb.users WHERE `refresh_token` = ?";
db.query(findUserFromToken,[refreshToken], async (err,results)=>{
    if(err) return res.json(err);         
    if(results.length == 0 ) return res.sendStatus(403); // Forbidden
        
    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || results[0].user_name !== decoded.user_name ) return res.sendStatus(403); // Forbidden
            const userrole = results[0].user_role;
            const accessToken = jwt.sign(
                {"UserInfo":{
                    "user_name": decoded.user_name,
                    "user_role": userrole
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '5m'}
            );
            res.json({ accessToken })

        }

    )
   

    
})


});

module.exports =  { refreshTokenRouter };