// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const allowedOrigins = require('../Config/allowedOrigins');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials  
