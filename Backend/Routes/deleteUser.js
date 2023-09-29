const express = require('express');
const { db } = require('../Config/databaseconfig.js');
const { verifyRoles } = require('../Middleware/verifyRoles.js');

const deleteUserRouter = express.Router();
deleteUserRouter.delete('/deleteuser/:username', async (req,res)=>{
console.log("We're in the delete function it has fired");
console.log(req.params);
console.log(req.params.username);
// Checking if username exists
const findDuplicatesquery = "SELECT * FROM vgsdb.users WHERE `user_name` = ?";
db.query(findDuplicatesquery,[req.params.username], async (err,results)=>{
    if(err) return res.json(err);
    if(results > 0){
    // deleting if username exists
    const Deleteuserquery = "DELETE FROM vgsdb.users WHERE `user_name` = ?";
    db.query(Deleteuserquery,[req.params.username], async (err,results)=>{
    if(err) return res.json(err);         
    return res.json(results)
})
    }      
 
})


});

module.exports =  { deleteUserRouter } ;