const express = require('express');
const { db } = require('../Config/databaseconfig.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signOutRouter = express.Router();
signOutRouter.get('/signout', async (req,res)=>{
    // On client(front end), also delete the accessToken

const cookies = req.cookies;
if(!cookies && cookies.jwt) return res.sendStatus(204); // No content to send back;
  const refreshToken = cookies.jwt;

// Searching for a user based on refresh_token exists
const findUserFromToken = "SELECT * FROM vgsdb.users WHERE `refresh_token` = ?";
db.query(findUserFromToken,[refreshToken], async (err,results)=>{
    if(err) return res.json(err);         
    if(results.length == 0 ){ 
      res.clearCookie('jwt',{httpOnly:true, sameSite:'None',secure:true});

        return res.sendStatus(204); // No Content

    }
    // delete refreshToken in db  

      const refreshtokenquery = "UPDATE vgsdb.users SET refresh_token = NULL WHERE user_name = ?";
      
      db.query(refreshtokenquery,[req.body.user_name], async (err,data)=>{
                if(err) return res.json(err);      
                return res.json("refresh token inserted successfully");
        
            });
 
    res.clearCookie('jwt',{httpOnly:true, sameSite:'None',secure:true});
    res.sendStatus(204);

})

});

module.exports =  { signOutRouter };