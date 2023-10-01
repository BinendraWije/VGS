const express = require('express');
const { db } = require('../Config/databaseconfig.js');
const { verifyRoles } = require('../Middleware/verifyRoles.js');

const getAllProductsRouter = express.Router();
getAllProductsRouter.get('/products',(req,res)=>{
    const sql = "SELECT * FROM vgsdb.Products";
 db.query(sql, async (err,products)=>{
        if(err) return res.json(err);
        return products;
    })

    const sql1 = "SELECT * FROM vgsdb.producttype";
 db.query(sql1, async(err,producttypes)=>{
        if(err) return res.json(err);
        return producttypes;
    }) 
    console.log(producttypes);
    console.log(products);    
    return res.json(products, producttypes);
})

module.exports = {getAllProductsRouter};