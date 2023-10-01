const express = require('express');
const { db } = require('../Config/databaseconfig.js');
const { verifyRoles } = require('../Middleware/verifyRoles.js');

const getAllProductsRouter = express.Router();
getAllProductsRouter.get('/products',(req,res)=>{
    const sql = "SELECT * FROM vgsdb.Products";
const products =  db.query(sql, async (err,data)=>{
        if(err) return res.json(err);
        return data;
    })

    const sql1 = "SELECT * FROM vgsdb.producttype";
    const producttypes = db.query(sql1, async(err,data1)=>{
        if(err) return res.json(err);
        return data1;
    }) 
    console.log(data1);
    console.log(data);    
    return res.json(products, producttypes);
})

module.exports = {getAllProductsRouter};