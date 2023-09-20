const {body, params, query} = require('express-validator');

const user_schema = [

body('user_name').exists({checkFalsy: true}),
body('user_pwd').exists({checkFalsy: true}),
body('user_role').exists({checkFalsy: true})

];

module.exports =  { user_schema } ;


