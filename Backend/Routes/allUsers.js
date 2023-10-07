// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
const { db } = require('../Config/databaseconfig.js');
const { verifyRoles } = require('../Middleware/verifyRoles.js');

const getAllUsersRouter = express.Router();
getAllUsersRouter.get('/users',(req,res)=>{
    const sql = "SELECT * FROM vgsdb.users";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);

    })
})

module.exports = {getAllUsersRouter};