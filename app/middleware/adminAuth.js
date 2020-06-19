const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const decoded_token = jwt.decode(token);
        if (decoded_token.role !== 'admin') {
            throw new Error();
        }
    } catch (err) {
        return res.status(401).json({
            message: "access denied"
        });
    }
    next();
}