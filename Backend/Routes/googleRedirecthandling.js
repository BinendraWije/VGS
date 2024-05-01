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

async function getUserData(access_token){
    console.log("User Data is triggered")
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
    console.log('data', data);
    return data
}

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const googleRedirectRouter = express.Router();
googleRedirectRouter.get('/oauth', async (req,res)=>{

//getting the params from the URL    
const code = req.query.code;
console.log(code);

try{
    const redirectURL ='http://ec2-13-49-145-29.eu-north-1.compute.amazonaws.com:3306/oauth';

    const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectURL 
    );

    const response = await oAuth2Client.getToken(code);  
    const data = await getUserData(response.tokens.access_token)

        // Checking if email exists
        // username is the name of the user
        const findDuplicatesquery = "SELECT * FROM vgsdb.users WHERE `user_name` = ?";
        db.query(findDuplicatesquery,[data.name], async (err,results)=>{
        if(err) return res.json(err);         
        if(results.length !== 0 ){
    
        // evaluate password
        const match = await bcrypt.compare(data.email + data.sub, results[0].user_pwd);
        if(match){
            // create JWT
            // gettin the user role from the results
            const user_role = results[0].user_role;

            const accessToken = jwt.sign(
                {"UserInfo": {
                    "user_name": data.name,
                    "user_role" : user_role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '10s'}
            );

            const refreshToken = jwt.sign(
                {"user_name": data.name},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '40s'}
            );
        //Updating the refresh token to the current user's profile in DB

            const refreshtokenquery = "UPDATE vgsdb.users SET refresh_token = ? WHERE user_name = ?";
      
            db.query(refreshtokenquery,[refreshToken,data.name], async (err,data)=>{
                    if(err){ return res.json(err);}else{                    
                    }
                });
          
          
                    // SET EITHER A COOKIE WITH THE ACCESS TOKEN AND PULL IT FROM THE FRONT END OR SESSION DATA;
                    // NEED TO CHANGE THE FRONT END TO LOGIN IN GOOGLES GUYS
                    // MAYBE CHECK OUT HOW ALOT OF PEOPLE HANDLE THAT MAYBE SESSION DATA IS THE WAY TO GO 
          
          
          //res.cookie('jwt', refreshToken, { domain:'13.49.145.29:3000', httpOnly:true, sameSite:'Lax', path:'/',maxAge: 24 * 60 * 60 * 1000})
          res.cookie('jwt', refreshToken, {httpOnly:true, sameSite:'Lax',  maxAge: 24 * 60 * 60 * 1000});
          res.cookie('access', accessToken, {httpOnly:true, sameSite:'Lax',  maxAge: 24 * 60 * 60 * 1000});     
          //res.json({ user_role, accessToken });
          res.redirect('http://13.49.145.29:3000'); 
        }else{
            res.sendStatus(401);
        }
    }else{
        // Create a new user      
        // Checking if username exists
const findDuplicatesquery = "SELECT * FROM vgsdb.users WHERE `user_name` = ?";
db.query(findDuplicatesquery,[data.name], async (err,results)=>{
    if(err) return res.json(err);         
    if(results.length > 0 ){
        return res.sendStatus(409);    

    }
})

const hash = await bcrypt.hash(data.email + data.sub,10);
  // inserting into the database

const q = "INSERT INTO vgsdb.users (`user_name`,`user_pwd`,`user_role`) VALUES(?)";
const values = [
      data.name,
      hash,
      "Admin",
      ]
db.query(q,[values], async (err,data)=>{
          if(err) return res.json(err);      
          return res.redirect('http://13.49.145.29:3000/dashboard');
  
      })


    }
    
    })

    }
catch(err){
res.json(err)
}


});

