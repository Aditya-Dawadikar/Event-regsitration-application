const jwt = require('jsonwebtoken');
const jwt_key = "mykey";

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, jwt_key);
    } catch (err) {
        res.status(401).json({
            message: "auth failed"
        });
    }
    next();
}