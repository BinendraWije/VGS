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

export const passportauthRedirectrouter = express.Router();
passportauthRedirectrouter.get('/passportgoogle', passport.authenticate('google', { scope: ['profile'] }));
