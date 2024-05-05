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

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://ec2-13-49-145-29.eu-north-1.compute.amazonaws.com:3306/oauth"
},
function(accessToken,refreshToken,profile, done){
  done(null,profile)
  // create jwttokens and save users 
  console.log(profile)
}

));
passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
});


export const passportauthRedirectrouter = express.Router();
passportauthRedirectrouter.get('/passportgoogle', passport.authenticate('google', { scope: [ 'profile' ],
    successRedirect: "http://13.49.145.29:3000/dashboard",
    failureRedirect: "http://13.49.145.29:3000/signin"
 }));
