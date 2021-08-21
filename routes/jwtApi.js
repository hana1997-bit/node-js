const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router();



// chargement du fichier d'env
require('dotenv').config();
// accès au variables
process.env.ACCESS_TOKEN_SECRET;
// generate token
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
}
// refresh token 
function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });
}

const user = {
    id: 42,
    name: 'Jean Bon',
    email: 'jeanbon@gmail.com',
    admin: true,
};
// login
router.post('/api/login', (req, res) => {

    // TODO: fetch le user depuis la db basé sur l'email passé en paramètre
    if (req.body.email !== user.email) {
        res.status(401).send('invalid credentials');
        return;
    }
    // TODO: check que le mot de passe du user est correct
    if (req.body.password !== 'cuillere') {
        res.status(401).send('invalid credentials');
        return;
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.send({
        accessToken,
        refreshToken,
    });

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
        const refreshedToken = generateAccessToken(user);
        res.send({
            accessToken: refreshedToken,
        });
    });
});
const accessToken = generateAccessToken(user);
const refreshToken = generateRefreshToken(user);
console.log('accessToken', accessToken);
console.log('refreshToken', refreshToken);

module.exports = router;