const jwt = require('jsonwebtoken');
const env = require('../config/env');

function generateAccessToken(user) {
    return jwt.sign(user.toJSON(), env.ACCESS_TOKEN_SECRET, {
        expiresIn: '3600s'
    });


}

function generateRefreshToken(user) {
    return jwt.sign(user.toJSON(), env.REFRESH_TOKEN_SECRET, {
        expiresIn: '3600s'
    });
}

// Authenticate User

function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // const tokenJson = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    // console.log(tokenJson.username);  GETTING USERNAME

    if (token === null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, env.ACCESS_TOKEN_SECRET, {}, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

module.exports = { generateAccessToken, generateRefreshToken, authenticateToken };