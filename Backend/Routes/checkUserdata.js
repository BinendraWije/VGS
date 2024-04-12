// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
import { db } from '../Config/databaseconfig.js';
import { verifyRoles } from '../Middleware/verifyRoles.js';
import { verifyJWT } from "../Middleware/verifyJWT.js";

export const getMyprofileRouter = express.Router();
getMyprofileRouter.get('/myprofile/:username', async (req,res)=>{

// Checking if username exists
const findDuplicatesquery = "SELECT * FROM vgsdb.users WHERE `user_name` = ?";
db.query(findDuplicatesquery,[req.params.username], async (err,results)=>{
    if(err) return res.json(err);
    const user = results[0]; 
   return res.json(user)
})

});

