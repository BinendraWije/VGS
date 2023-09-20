const {check} = require('express-validator');

const user_schema = [

check.body('user_name').exists({checkFalsy: true}),
check.body('user_pwd').exists({checkFalsy: true}),
check.body('user_role').exists({checkFalsy: true})

];

module.exports =  { user_schema } ;


