const {check} = require('express-validator');

const user_schema = [

check('user_name').exists({checkFalsy: true}),
check('user_pwd').exists({checkFalsy: true}),
check('user_role').exists({checkFalsy: true})

];

module.exports =  { user_schema } ;


