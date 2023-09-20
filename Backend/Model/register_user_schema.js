const expressvalidator = require('express-validator');

const user_schema = [

expressvalidator.body('user_name').exists({checkFalsy: true}),
expressvalidator.body('user_pwd').exists({checkFalsy: true}),
expressvalidator.body('user_role').exists({checkFalsy: true})

];

module.exports =  { user_schema } ;


