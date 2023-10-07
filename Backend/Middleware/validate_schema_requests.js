// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const {check, validationResult} = require('express-validator');

const validateRequestSchema = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
}

module.exports = {validateRequestSchema};