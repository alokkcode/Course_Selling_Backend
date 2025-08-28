const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");


function adminMiddleware(req, res, next) {

    try {
        const token = req.headers.token;

        if (!token) {
            res.status(401).json({
                message: "Token missing. Please sign in first."
            });
            return
        }

        const decoded = jwt.verify(token, JWT_ADMIN_SECRET);

        req.userId = decoded.id;
        next()

    } catch (err) {
        console.error("JWT error:", err.message);
        return res.status(403).json({
            message: "Invalid or expired token. Please login again."
        });
    }

}

module.exports = {
    adminMiddleware: adminMiddleware
}
