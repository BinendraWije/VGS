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

export const passportauthsuccessandfailureRedirectrouter = express.Router();
passportauthsuccessandfailureRedirectrouter.get('/successandfailpassportgoogle', passport.authenticate("google",{
    successRedirect: "http://13.49.145.29:3000/dashboard",
    failureRedirect: "http://13.49.145.29:3000/signin"

}));
