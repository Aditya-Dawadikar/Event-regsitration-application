const jwt = require('jsonwebtoken');
const jwt_key = "mykey";
const jwt_decoded = require('jwt-decode')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, jwt_key);
        const decoded_token = jwt.decode(token);
        console.log("decoded token.role:" + decoded_token.role);
        if (decoded_token.role !== 'admin' && decoded_token.role !== 'volunteer') {
            throw new Error();
        }
    } catch (err) {
        res.status(401).json({
            message: "auth failed"
        });
    }
    next();
}