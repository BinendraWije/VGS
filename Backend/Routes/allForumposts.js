// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
import { db } from '../Config/databaseconfig.js';

export const getAllForumPostsRouter = express.Router();
getAllForumPostsRouter.get('/forumposts',(req,res)=>{
    const sql = "SELECT * FROM vgsdb.forumposts";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);

    })
});

