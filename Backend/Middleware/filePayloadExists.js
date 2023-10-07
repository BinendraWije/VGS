// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

export const filesPayloadExists = (req, res, next) => {
    if (!req.files) return res.status(400).json({ status: "error", message: "Missing files" })

    next()
}



















