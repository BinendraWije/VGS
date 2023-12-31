// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const {body, param, query} = require('express-validator');

const user_schema = [
body('user_name').exists({checkFalsy: true}),
body('user_pwd').exists({checkFalsy: true}),
body('user_role').exists({checkFalsy: true})
];

module.exports =  { user_schema } ;


