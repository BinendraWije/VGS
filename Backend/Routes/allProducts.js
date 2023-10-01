const express = require('express');
const { db } = require('../Config/databaseconfig.js');
const { verifyRoles } = require('../Middleware/verifyRoles.js');

const getAllProductsRouter = express.Router();
getAllProductsRouter.get('/products',(req,res)=>{
    const sql = "SELECT * FROM vgsdb.Products; SELECT * FROM vgsdb.producttype ";
 db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        console.log(data);
        return res.json({
            products :data[0],
            producttypes :data[1]
        });
    })
   

})

module.exports = {getAllProductsRouter};