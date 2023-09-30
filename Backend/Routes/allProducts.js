const express = require('express');
const { db } = require('../Config/databaseconfig.js');
const { verifyRoles } = require('../Middleware/verifyRoles.js');

const getAllProductsRouter = express.Router();
getAllProductsRouter.get('/products',(req,res)=>{
    const sql = "SELECT * FROM vgsdb.Products";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);

    })
})

module.exports = {getAllProductsRouter};