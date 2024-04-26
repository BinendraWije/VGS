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
            console.log("User Data is triggered")
            const response = await axios.post(url,qs.stringify(values),{headers:{'Content-Type':'application/x-www-form-urlencoded'}});
            console.log(response.data);
            
        }catch(err){
                res.json(err);
        }

        // get the user with tokens


        //update the user data

        //create access and refresh jwt tokens and set cookie
















})