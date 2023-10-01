const express = require('express');
const { db } = require('../Config/databaseconfig.js');
const { verifyRoles } = require('../Middleware/verifyRoles.js');

const getAllProductsRouter = express.Router();
getAllProductsRouter.get('/products',(req,res)=>{
 let productsarray
    const sql = "SELECT * FROM vgsdb.Products";
 db.query(sql, async (err,products)=>{
        if(err) return res.json(err);
        productsarray = products
        return productsarray;
    })
let producttypesarray

    const sql1 = "SELECT * FROM vgsdb.producttype";
 db.query(sql1, async(err,producttypes)=>{
        if(err) return res.json(err);
        producttypesarray = producttypes
        return producttypesarray;
    }) 
    console.log(data1);
    console.log(productsarray);    
    return res.json(productsarray, producttypesarray);
})

module.exports = {getAllProductsRouter};