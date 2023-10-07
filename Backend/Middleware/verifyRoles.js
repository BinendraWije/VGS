// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const verifyRoles = (...allowedRoles) => {
    return (req,res,next)=>{
        if(!req && ! req.user_role) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        const result = rolesArray.includes(req.user_role);
        if(result === false) return res.sendStatus(401);
        next();

    }
}

module.exports = { verifyRoles }