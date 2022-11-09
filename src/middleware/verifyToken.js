const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        accessToken = token.split(' ')[1];
        jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET,
            (err, user) => {
                if (err) {
                    return res
                        .status(403)
                        .json({ message: 'Token is not valid!' });
                }
                req.user = user;
                next();
            },
        );
    } else return res.status(401).json({ message: "You're not authenticated" });
};

module.exports = verifyToken;
