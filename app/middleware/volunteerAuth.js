const jwt_decode = require('jwt-decode');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const splitToken = token.split(" ");
        const requiredToken = splitToken[1];

        const decoded = jwt_decode(requiredToken);
        console.log(decoded);
    } catch (err) {
        res.status(401).json({
            message: "auth failed"
        });
    }
    next();
}