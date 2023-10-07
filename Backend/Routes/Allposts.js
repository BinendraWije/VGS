// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
const { db } = require('../Config/databaseconfig.js');

const getAllPostsRouter = express.Router();
getAllPostsRouter.get('/posts',(req,res)=>{
    const sql = "SELECT * FROM vgsdb.posts";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        console.log(data);
        return res.json(data);

    })
})

module.exports =  { getAllPostsRouter } ;