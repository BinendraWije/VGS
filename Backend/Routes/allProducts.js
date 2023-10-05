const express = require('express');
const { db } = require('../Config/databaseconfig.js');
const { verifyRoles } = require('../Middleware/verifyRoles.js');

const getAllProductsRouter = express.Router();
getAllProductsRouter.get('/products',(req,res)=>{
    const sql = "SELECT * FROM vgsdb.Products";
     db.query(sql,(err,products)=>{
        if(err) return res.json(err);

        const sql1 = "SELECT * FROM vgsdb.producttype";
        db.query(sql1,(err,producttypes)=>{
            if(err) return res.json(err);            
            return res.json({products,producttypes});
    })
         
    })
})

module.exports = {getAllProductsRouter};