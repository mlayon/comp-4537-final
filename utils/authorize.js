const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { formatError } = require('../utils/respFormat');

function checkAuthToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.token_secret, (err, decode) => {
            if (err) resolve(null)
            else resolve(decode)
        })
    })
}

async function authorize(req, res, next) {
    const auth = await checkAuthToken(req.get('authToken'))
    req.user = auth
    if (auth) {
        console.info(`Valid auth token from ${req.connection.remoteAddress}`)
        next()
    } else {
        console.info(`Invalid auth token from ${req.connection.remoteAddress}`)
        return res.status(400).json(formatError("Invalid auth token"))
    }
}

module.exports = authorize;