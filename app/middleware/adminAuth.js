const jwt = require('jsonwebtoken');
const jwt_key = "mykey";

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token, jwt_key);
        console.log(decoded);
    } catch (err) {
        res.status(401).json({
            message: "auth failed"
        });
    }
    next();
}