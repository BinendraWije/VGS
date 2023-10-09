// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const fileUpload = require('express-fileupload');
const express = require('express');
import { db } from '../Config/databaseconfig.js';
import { verifyRoles } from '../Middleware/verifyRoles.js';
import crypto from 'crypto';
import { uploadFile, deleteFile, getObjectSignedUrl } from '../Config/s3.js';

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

export const editProductRouter = express.Router();
editProductRouter.post('/editproduct/:productname', async (req,res)=>{
if(!req.body.Product_Name || !req.body.Product_Description || !req.body.Product_Price || !req.body.product_type_ID || !req.body.Product_Quantity)return res.status(400).json({'message':'Check if all the data was submitted properly.'});


// Checking if product exists
const findDuplicatesquery = "SELECT * FROM vgsdb.Products WHERE `Product_Name` = ?";
db.query(findDuplicatesquery,[req.params.productname], async (err,results)=>{
    if(err) return res.json(err);         
    if(results.length > 0 ){
        // updating  into the s3 and database
        //add the logic to deal with existing images

        const imageName1 = (results[0].Product_Image_1 === null || undefined ) ? generateFileName() : results[0].Product_Image_1;
        const imageName2 = (results[0].Product_Image_2 === null || undefined ) ? generateFileName() : results[0].Product_Image_2;
        const imageName3 = (results[0].Product_Image_3 === null || undefined ) ? generateFileName() : results[0].Product_Image_3;
        const imageName4 = (results[0].Product_Image_4 === null || undefined ) ? generateFileName() : results[0].Product_Image_4;

        if(req.files.Product_Image_1){

            await uploadFile(req.files.Product_Image_1.data, req.body.Product_Name+"/"+imageName1, req.files.Product_Image_1.mimetype)
        }
        
        if(req.files.Product_Image_2){
            
            await uploadFile(req.files.Product_Image_2.data, req.body.Product_Name+"/"+imageName2, req.files.Product_Image_2.mimetype)
        }
        if(req.files.Product_Image_3){
            
            await uploadFile(req.files.Product_Image_3.data, req.body.Product_Name+"/"+imageName3, req.files.Product_Image_3.mimetype)
        }
        if(req.files.Product_Image_4){
            
            await uploadFile(req.files.Product_Image_4.data, req.body.Product_Name+"/"+imageName4, req.files.Product_Image_4.mimetype)
        }

        // delete files handling as well needs to be implemented here if there arent any images where once there was, also think about editing 
        //the s3 folder name based on the new edit of the name of the product 
        if(req.body.Product_Name != req.params.productname){
            await deleteFile(req.params.productname);
        }
        
        const productImage1name = ( req.files.Product_Image_1 === undefined) ? null : imageName1 
        const productImage2name = ( req.files.Product_Image_2 === undefined) ? null : imageName2 
        const productImage3name = ( req.files.Product_Image_3 === undefined) ? null : imageName3 
        const productImage4name = ( req.files.Product_Image_4 === undefined) ? null : imageName4 
              

        const q = "UPDATE vgsdb.Products SET Product_Name = ?, Product_Description = ?, Product_Image_1 = ?,Product_Image_2 = ?,Product_Image_3 = ?,Product_Image_4 = ?,Product_Quantity = ?,Product_Price = ?,product_type_ID = ? WHERE Product_Name = ?";
      
        db.query(q,[req.body.Product_Name, req.body.Product_Description, productImage1name, productImage2name,productImage3name,productImage4name,req.body.Product_Quantity,req.body.Product_Price,
            req.body.product_type_ID,req.params.productname
        ], async (err,data)=>{
                  if(err) return res.json(err);      
                  return res.json("user successfully edited");
          
              })
    }
})




});

