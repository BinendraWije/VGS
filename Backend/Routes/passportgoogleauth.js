// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
import { db } from '../Config/databaseconfig.js';
import bcrypt from 'bcryptjs';
import { error } from "console";
const jwt = require('jsonwebtoken');
require('dotenv').config();
const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

export const passportRedirectrouter = express.Router();
passportRedirectrouter.get('/oauth', async (req,res)=>{

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://ec2-13-49-145-29.eu-north-1.compute.amazonaws.com:3306/oauth"
},
function(accessToken,refreshToken,profile, done){
  done(null,profile)
  // create jwttokens and save users 
}

));
passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})
})