const express = require('express');
const fileUpload = require('express-fileupload');
const { db } = require('../Config/databaseconfig.js');
const { verifyRoles } = require('../Middleware/verifyRoles.js');
const path = require("path");
const filesPayloadExists = require('../Middleware/filePayloadExists.js');
const fileSizeLimiter = require('../Middleware/fileSizeLimiter.js');




const createProductRouter = express.Router();
createProductRouter.post('/createproduct',
fileUpload({ createParentPath: true }),
async (req,res)=>{
    //validate if required data exists
if(!req.body.Product_Name || !req.body.Product_Description || !req.body.Product_Price || !req.body.product_type_ID || !req.body.Product_Quantity)return res.status(400).json({'message':'Check if all the data was submitted properly.'});
console.log(req.body);
console.log(req.files.Product_Image_1);
console.log(req.files.Product_Image_2);

// Checking if username exists
const findDuplicatesquery = "SELECT * FROM vgsdb.Products WHERE `Product_Name` = ?";
db.query(findDuplicatesquery,[req.body.Product_Name], async (err,results)=>{
    if(err) return res.json(err);         
    if(results.length > 0 ){
        return res.sendStatus(409);    

    }
})

//saving the files in the folder
if(req.files.Product_Image_1){ 
const folderpath1 = path.join('../../public/images',req.body.Product_Name,req.files.Product_Image_1.name);
req.files.Product_Image_1.mv(folderpath1,(err)=>{
    if(err) return res.sendStatus(500);
})

}
if(req.files.Product_Image_2){ 
    const folderpath2 = path.join('../../public/images',req.body.Product_Name,req.files.Product_Image_2.name);
    req.files.Product_Image_2.mv(folderpath2,(err)=>{
        if(err) return res.sendStatus(500);
    })
    const productImage1name = req.files.Product_Image_1.name;
    return productImage1name
    }
if(req.files.Product_Image_3){ 
        const folderpath3 = path.join('../../public/images',req.body.Product_Name,req.files.Product_Image_3.name);
        req.files.Product_Image_3.mv(folderpath3,(err)=>{
            if(err) return res.sendStatus(500);
        })
        
        }
if(req.files.Product_Image_4){ 
            const folderpath4 = path.join('../../public/images',req.body.Product_Name,req.files.Product_Image_4.name);
            req.files.Product_Image_4.mv(folderpath4,(err)=>{
                if(err) return res.sendStatus(500);
            })
            
            }

    const productImage1name = ( req.files.Product_Image_1 === 'undefined') ? null : req.files.Product_Image_1.name 
    const productImage2name = ( req.files.Product_Image_2 === 'undefined') ? null : req.files.Product_Image_2.name 
    const productImage3name = ( req.files.Product_Image_3 === 'undefined') ? null : req.files.Product_Image_3.name 
    const productImage4name = ( req.files.Product_Image_4 === 'undefined') ? null : req.files.Product_Image_4.name 


const q = "INSERT INTO vgsdb.Products (`Product_Name`,`Product_Description`,`Product_Image_1`,`Product_Image_2`,`Product_Image_3`,`Product_Image_4`,`Product_Quantity`,`Product_Price`,`product_type_ID`) VALUES(?)";
const values = [
      req.body.Product_Name,
      req.body.Product_Description,
      productImage1name,
      productImage2name,
      productImage3name,
      productImage4name,   
      req.body.Product_Quantity,
      req.body.Product_Price,
      req.body.product_type_ID,  
           ]

db.query(q,[values], async (err,data)=>{
          if(err) return res.json(err);      
          return res.json("product successfully created");
  
      })

});

module.exports =  { createProductRouter } ;