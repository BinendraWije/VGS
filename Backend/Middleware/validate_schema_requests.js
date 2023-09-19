const express = require('express');
const expressvalidator = require('express-validator');

const validateRequestSchema = (req,res,next) => {
    const errors = expressvalidator.validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
}

module.exports = {validateRequestSchema};