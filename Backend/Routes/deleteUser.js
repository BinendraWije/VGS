// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
import { db } from '../Config/databaseconfig.js';
import { verifyRoles } from '../Middleware/verifyRoles.js';

export const deleteUserRouter = express.Router();
deleteUserRouter.delete('/deleteuser/:username', async (req,res)=>{
console.log("We're in the delete function it has fired");
console.log(req.params);
console.log(req.params.username);
// Checking if username exists
const findDuplicatesquery = "SELECT * FROM vgsdb.users WHERE `user_name` = ?";
db.query(findDuplicatesquery,[req.params.username], async (err,results)=>{
    console.log(results[0]);
    if(err){ 
        return res.json(err);
    }else{
        console.log("we're in the else section")
    if(results.length > 0){
    // deleting if username exists
    console.log("We foud him");
    const Deleteuserquery = "DELETE FROM vgsdb.users WHERE `user_name` = ?";
    db.query(Deleteuserquery,[req.params.username], async (err,results)=>{
    if(err) return res.json(err);         
    return res.json(results)
})
    }      
}
})


});

