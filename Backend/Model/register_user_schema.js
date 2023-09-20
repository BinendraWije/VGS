const {check} = require('express-validator');

const user_schema = [

check('user_name').notEmpty(),
check('user_pwd').notEmpty(),
check('user_role').notEmpty()

];

module.exports =  { user_schema } ;


