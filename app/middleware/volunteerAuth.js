const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const decoded_token = jwt.decode(token);
        if (!(decoded_token.role === 'admin' || decoded_token.role === 'volunteer')) {
            throw new Error();
        }
    } catch (err) {
        res.status(401).json({
            message: "auth failed"
        });
    }
    next();
}