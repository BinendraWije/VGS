// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
import { db } from '../Config/databaseconfig.js';
import { verifyRoles } from '../Middleware/verifyRoles.js';
import { uploadFile, deleteFile, getObjectSignedUrl } from '../Config/s3.js';

export const getAllProductsRouter = express.Router();
getAllProductsRouter.get('/products',(req,res)=>{
    const sql = "SELECT * FROM vgsdb.Products";
     db.query(sql,(err,products)=>{
        if(err) return res.json(err);

        for(const product of products){
            if(product.Product_Image_1){
            product.productimageurl1 = getObjectSignedUrl(product.Product_Image_1);
            console.log(product);
            }

            if(product.Product_Image_2){
                product.productimageurl2 = getObjectSignedUrl(product.Product_Image_2);
                console.log(product);
                }
                if(product.Product_Image_3){
                   product.productimageurl3 = getObjectSignedUrl(product.Product_Image_3);

                    console.log(product);
                    }
                    if(product.Product_Image_4){
                      product.productimageurl4 = getObjectSignedUrl(product.Product_Image_4);
                        console.log(product);
                        }
        }

        const sql1 = "SELECT * FROM vgsdb.producttype";
        db.query(sql1,(err,producttypes)=>{
            if(err) return res.json(err);            
            return res.json({products,producttypes});
    })
         
    })
})

