// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);
import allowedOrigins from './allowedOrigins.js';

export const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

