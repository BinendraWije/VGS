const express = require('express');
const { db } = require('../Config/databaseconfig.js');
const { verifyRoles } = require('../Middleware/verifyRoles.js');

const deleteUserRouter = express.Router();
deleteUserRouter.delete('/deleteuser', async (req,res)=>{
console.log(req.body.user_name);
// Checking if username exists
const findDuplicatesquery = "SELECT * FROM vgsdb.users WHERE `user_name` = ?";
db.query(findDuplicatesquery,[req.body.user_name], async (err,results)=>{
    if(err) return res.json(err);
    if(results > 0){
    // deleting if username exists
    const Deleteuserquery = "DELETE FROM vgsdb.users WHERE `user_name` = ?";
    db.query(Deleteuserquery,[req.body.user_name], async (err,results)=>{
    if(err) return res.json(err);         
    return res.json(results)
})
    }      
 
})


});

module.exports =  { deleteUserRouter } ;