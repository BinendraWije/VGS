const express = require('express');
const fileUpload = require('express-fileupload');
const { db } = require('../Config/databaseconfig.js');
const { verifyRoles } = require('../Middleware/verifyRoles.js');
const path = require("path");

const createProductRouter = express.Router();
createProductRouter.post('/createproduct', async (req,res)=>{
    //validate if required data exists
if(!req.body.Product_Name || !req.body.Product_Description || !req.body.Product_Price || !req.body.product_type_ID || !req.body.Product_Quantity)return res.status(400).json({'message':'Check if all the data was submitted properly.'});

console.log(req.body);




/* 
// Checking if username exists
const findDuplicatesquery = "SELECT * FROM vgsdb.users WHERE `user_name` = ?";
db.query(findDuplicatesquery,[req.body.user_name], async (err,results)=>{
    if(err) return res.json(err);         
    if(results.length > 0 ){
        return res.sendStatus(409);    

    }
})

  inserting into the database

const q = "INSERT INTO vgsdb.users (`user_name`,`user_pwd`,`user_role`) VALUES(?)";
const values = [
      req.body.user_name,
      req.body.user_pwd,
      req.body.user_role,
      ]
db.query(q,[values], async (err,data)=>{
          if(err) return res.json(err);      
          return res.json("user successfully created");
  
      })
*/
});

module.exports =  { createProductRouter } ;