const express = require('express');
const { db } = require('../Config/databaseconfig.js');

const getAllUsersRouter = express.Router();
getAllUsersRouter.get('/users',(req,res)=>{
    const sql = "SELECT * FROM vgsdb.users";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        console.log(data);
        return res.json(data);

    })
})

module.exports = {getAllUsersRouter};