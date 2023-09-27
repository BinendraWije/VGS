const express = require('express');
const { db } = require('../Config/databaseconfig.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const signInRouter = express.Router();
signInRouter.post('/auth', async (req,res)=>{
if(!req.body.user_name || !req.body.user_pwd)return res.status(400).json({'message':'Username and password are required.'});
const user = req.body.user_name;
// Checking if username exists
const findDuplicatesquery = "SELECT * FROM vgsdb.users WHERE `user_name` = ?";
db.query(findDuplicatesquery,[user], async (err,results)=>{
    if(err) return res.json(err);         
    if(results.length == 0 ) return res.sendStatus(401); //Unauthorized
    
    // evaluate password
    const match = await bcrypt.compare(req.body.user_pwd, results[0].user_pwd);
    if(match){
        // create JWT
        // gettin the user role from the results
        const user_role = results[0].user_role;

        const accessToken = jwt.sign(
            {"UserInfo": {
                "user_name": req.body.user_name,
                "user_role" : user_role
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '10s'}
        );

        const refreshToken = jwt.sign(
            {"user_name": req.body.user_name},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
        //Updating the refresh token to the current user's profile in DB

        const refreshtokenquery = "UPDATE vgsdb.users SET refresh_token = ? WHERE user_name = ?";
      
        db.query(refreshtokenquery,[refreshToken,req.body.user_name], async (err,data)=>{
                  if(err){ return res.json(err);}else{      
                console.log("I'm here after setting the cookie with the refreshtoken ");
                }
              });
        
        res.cookie('jwt', refreshToken, {httpOnly:true, sameSite:'None', secure: true, maxAge: 24 * 60 * 60 * 1000});
        res.json({ user_role, accessToken }); 
    }else{
        res.sendStatus(401);
    }

    
})


});

module.exports =  { signInRouter } ;