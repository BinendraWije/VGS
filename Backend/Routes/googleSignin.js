// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const {OAuth2Client} =require('google-auth-library'); 

const express = require('express');
import { db } from '../Config/databaseconfig.js';
import bcrypt from 'bcryptjs';
import { error } from "console";
const jwt = require('jsonwebtoken');
require('dotenv').config();


export const googlesignInRouter = express.Router();
googlesignInRouter.post('/googlesigninrequest', async (req,res)=>{
res.header('Referrer-Policy', 'no-referrer-when-downgrade');

const redirectURL ='http://ec2-13-49-145-29.eu-north-1.compute.amazonaws.com:3306/oauth';

const oAuth2Client = new OAuth2Client(
process.env.GOOGLE_CLIENT_ID,
process.env.GOOGLE_CLIENT_SECRET,
redirectURL 
);

const authorizeURL = oAuth2Client.generateAuthUrl({
    access_type:'offline',
    scope:'https://www.googleapis.com/auth/userinfo.email userinfo.profile  openid',
    prompt:'consent' 
})

res.json({url:authorizeURL});

/* Checking if username exists
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
            {expiresIn: '40s'}
        );
        //Updating the refresh token to the current user's profile in DB

        const refreshtokenquery = "UPDATE vgsdb.users SET refresh_token = ? WHERE user_name = ?";
      
        db.query(refreshtokenquery,[refreshToken,req.body.user_name], async (err,data)=>{
                  if(err){ return res.json(err);}else{                    
                }
              });
        
        res.cookie('jwt', refreshToken, {httpOnly:true, sameSite:'Lax',  maxAge: 24 * 60 * 60 * 1000});
        res.json({ user_role, accessToken }); 
    }else{
        res.sendStatus(401);
    }

    
})

*/
});

