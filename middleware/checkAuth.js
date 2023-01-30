const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    console.log(token);
    if (!token) return res.status(401).send('Access Denied')
    const Bearer = token.split(' ')[1]
    try {
        const verified = jwt.verify(Bearer, process.env.JWT_HEX)
        req.user = verified
        next()
    } catch (err) {
        res.status(400).send('Invalid Token')
    }
}

module.exports = verifyToken;