const express = require('express');
const { db } = require('../Config/databaseconfig.js');
const { verifyRoles } = require('../Middleware/verifyRoles.js');

const getAllProductsRouter = express.Router();
getAllProductsRouter.get('/products',(req,res)=>{
    const sql = "SELECT * FROM vgsdb.Products";
const products =  db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        return data;
    })

    const sql1 = "SELECT * FROM vgsdb.producttype";
    const producttypes = db.query(sql1,(err,data)=>{
        if(err) return res.json(err);
        return data;
    }) 
    console.log(products[1]);
    console.log(producttypes[1]);    
    return res.json({products, producttypes});
})

module.exports = {getAllProductsRouter};