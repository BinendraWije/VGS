const express = require('express');
const { db } = require('../Config/databaseconfig.js');
const { verifyRoles } = require('../Middleware/verifyRoles.js');

const getAllProductsRouter = express.Router();
getAllProductsRouter.get('/products',(req,res)=>{
    const sql = "SELECT * FROM vgsdb.Products";
const products =  db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        console.log(data);
        return data;
    })

    const sql1 = "SELECT * FROM vgsdb.producttype";
    const producttypes = db.query(sql1,(err,data)=>{
        if(err) return res.json(err);
        return data;
    }) 
    console.log(products.RowDataPacket);
    products = products.RowDataPacket;
    producttypes =producttypes.RowDataPacket;
    return res.json({products, producttypes});
})

module.exports = {getAllProductsRouter};