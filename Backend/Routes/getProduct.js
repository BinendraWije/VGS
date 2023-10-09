// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
import { db } from '../Config/databaseconfig.js';
import { verifyRoles } from '../Middleware/verifyRoles.js';
import { uploadFile, deleteFile, getObjectSignedUrl } from '../Config/s3.js';

export const getProductRouter = express.Router();
getProductRouter.get('/getproduct/:productname', async (req,res)=>{

// Checking if username exists
const findDuplicatesquery = "SELECT * FROM vgsdb.Products WHERE `Product_Name` = ?";
db.query(findDuplicatesquery,[req.params.productname], async (err,results)=>{
    if(err) return res.json(err);
    const product = results[0];

        if(product.Product_Image_1){
        product.productimageurl1 =  await getObjectSignedUrl(product.Product_Name + "/" + product.Product_Image_1);
        console.log(product);
        }

        if(product.Product_Image_2){
            product.productimageurl2 =  await getObjectSignedUrl(product.Product_Name + "/" + product.Product_Image_2);
            console.log(product);
            }
            if(product.Product_Image_3){
               product.productimageurl3 =  await getObjectSignedUrl(product.Product_Name + "/" + product.Product_Image_3);

                console.log(product);
                }
                if(product.Product_Image_4){
                  product.productimageurl4 = await getObjectSignedUrl(product.Product_Name + "/" + product.Product_Image_4);
                    console.log(product);
                    }
    
  
   return res.json(product)
})

});

