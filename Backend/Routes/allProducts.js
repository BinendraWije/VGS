// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
import { db } from '../Config/databaseconfig.js';
import { verifyRoles } from '../Middleware/verifyRoles.js';

export const getAllProductsRouter = express.Router();
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

