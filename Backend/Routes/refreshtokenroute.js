const express = require('express');
const { db } = require('../Config/databaseconfig.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const handleRefreshTokenrouter = express.Router();
handleRefreshTokenrouter.get('/refresh', async (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    if (!cookies && !cookies.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    // Searching for a user based on refresh_token exists
const findUserFromToken = "SELECT * FROM vgsdb.users WHERE `refresh_token` = ?";
const foundUser = db.query(findUserFromToken,[refreshToken], async (err,results)=>{
    if(err) return res.json(err);         
    if(results.length == 0 ) return res.sendStatus(403); // Forbidden
    
    return results[0]

});
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.user_name !== decoded.user_name) return res.sendStatus(403);
            const user_role = foundUser.user_role;
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "user_name": decoded.user_role,
                        "user_role": user_role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );
            res.json({ user_role, accessToken })
        }
    );
});

module.exports = { handleRefreshTokenrouter }