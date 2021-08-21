const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router();




// generate token
// function generateAccessToken(user) {
//     return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
// }
// refresh token 
// function generateRefreshToken(user) {
//     return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });
// }

const User = require('../models/userSchema')
// login
router.post('/api/login', async (req, res) => {
    try {
        // TODO: fetch le user depuis la db basé sur l'email passé en paramètre
        const user = await User.findOne({ email: req.body.email, password: req.body.password });
        if (!user) {
            res.status(401).json({ message: 'invalid credentials' });
        }
        //    console.log(user);
        const tokenData = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        };
        const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION });
        const refreshToken = jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });

        res.json({
            accessToken,
            refreshToken,
        });
    } catch (err) {
        console.log(err);
        res.statuts(500).json({ message: 'internal server error' });
    }
});
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(401)
        }
        req.user = user;
        next();
    });
}
// get user
router.get('/api/me', authenticateToken, (req, res) => {
    res.send(req.user);
});
// refresh 
router.post('/api/refreshToken', (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(401)
        }

        // TODO: Check en base que l'user est toujours existant/autorisé à utiliser la plateforme
        delete user.iat;
        delete user.exp;
        const refreshedToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
        res.send({
            accessToken: refreshedToken,
        });
    });
});
// const accessToken = generateAccessToken(user);
// const refreshToken = generateRefreshToken(user);
// console.log('accessToken', accessToken);
// console.log('refreshToken', refreshToken);

module.exports = router;