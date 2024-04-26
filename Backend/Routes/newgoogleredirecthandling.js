// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
import qs from 'querystring'
import { db } from '../Config/databaseconfig.js';
import bcrypt from 'bcryptjs';
import { error } from "console";
import axios from 'axios';
const jwt = require('jsonwebtoken');
require('dotenv').config();

const redirectURL ='http://ec2-13-49-145-29.eu-north-1.compute.amazonaws.com:3306/oauth';

export const newgoogleRedirectRouter = express.Router();
newgoogleRedirectRouter.get('/oauth', async (req,res)=>{
        // get the code from qs 
        const code = req.query.code

        // get the id and access token with the code
        const url = 'https://oauth2.googleapis.com/token'
        const values = {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: redirectURL,
            grant_type: 'authorization_code'
        };
        try{
            console.log("Access and id token fetch is triggered")
            const response1 = await axios.post(url,qs.stringify(values),{headers:{'Content-Type':'application/x-www-form-urlencoded'}});
            const{id_token, access_token} = response1.data;     

            // get the user with tokens
            console.log("getting userdata section triggered")
            const response2 = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`,{
                headers: {
                    Authorization: `Bearer ${id_token}`
                }
            })
            const googleUser = response2.data;  

            //update the user data
            const findDuplicatesquery = "SELECT * FROM vgsdb.users WHERE `user_name` = ?";
            db.query(findDuplicatesquery,[googleUser.name], async (err,results)=>{
            if(err) return res.json(err);         
            if(results.length !== 0 ){
        
            // evaluate password
            const match = await bcrypt.compare(googleUser.email + googleUser.sub, results[0].user_pwd);
            if(match){
                // create JWT
                // gettin the user role from the results
                const user_role = results[0].user_role;
    
                const accessToken = jwt.sign(
                    {"UserInfo": {
                        "user_name": googleUser.name,
                        "user_role" : user_role
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: '10s'}
                );
    
                const refreshToken = jwt.sign(
                    {"user_name": googleUser.name},
                    process.env.REFRESH_TOKEN_SECRET,
                    {expiresIn: '40s'}
                );
            //Updating the refresh token to the current user's profile in DB
    
                const refreshtokenquery = "UPDATE vgsdb.users SET refresh_token = ? WHERE user_name = ?";
          
                db.query(refreshtokenquery,[refreshToken,googleUser.name], async (err,data)=>{
                        if(err){ return res.json(err);}else{                    
                        }
                    });                                          
              
              //res.cookie('jwt', refreshToken, { domain:'13.49.145.29:3000', httpOnly:true, sameSite:'Lax', path:'/',maxAge: 24 * 60 * 60 * 1000})
              res.cookie('jwt', refreshToken, {httpOnly:true, sameSite:'Lax',  maxAge: 24 * 60 * 60 * 1000});
              res.json({ user_role, accessToken });
              //res.redirect('http://13.49.145.29:3000'); 
            }else{
                res.sendStatus(401);
            }
        }else{
            // Create a new user      
            // Checking if username exists
    const findDuplicatesquery = "SELECT * FROM vgsdb.users WHERE `user_name` = ?";
    db.query(findDuplicatesquery,[googleUser.name], async (err,results)=>{
        if(err) return res.json(err);         
        if(results.length > 0 ){
            return res.sendStatus(409);    
    
        }
    })
    
    const hash = await bcrypt.hash(googleUser.email + googleUser.sub,10);
      // inserting into the database
    
    const q = "INSERT INTO vgsdb.users (`user_name`,`user_pwd`,`user_role`) VALUES(?)";
    const values = [
        googleUser.name,
          hash,
          "Admin",
          ]
    db.query(q,[values], async (err,data)=>{
              if(err) return res.json(err);      
              return res.redirect('http://13.49.145.29:3000/dashboard');
      
          })
    
    
        }
        
        })
    
            //create access and refresh jwt tokens and set cookie





        }catch(err){
                res.json(err);
        }

        















})