import { body } from 'express-validator';

const user_schema = [

body('user_name').exists({checkFalsy: true}),
body('user_pwd').exists({checkFalsy: true}),
body('user_role').exists({checkFalsy: true})

];

export { user_schema as userSchema}

