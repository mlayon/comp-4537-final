const _ = require('lodash');
const jwt = require('jsonwebtoken');
const db = require('../utils/database');
const { formatError } = require('../utils/respFormat');

function checkAuthToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.token_secret, (err, decode) => {
            if (err) resolve(null)
            else resolve(decode)
        })
    })
}

function authorize(adminOnly = false) {
    return async function(req, res, next) {
        const auth = await checkAuthToken(req.get('authToken'))
        req.user = auth
        if (auth) {
            console.info(`Valid auth token from ${req.connection.remoteAddress}`)

            if (adminOnly && !req.user.is_admin) {
                console.info(`Invalid auth level from ${req.connection.remoteAddress}`)
                return res.status(400).json(formatError("Invalid auth token"))
            }

            // Store full user object for easier use
            req.user = await db.getUser(req.user.email);

            next()
        } else {
            console.info(`Invalid auth token from ${req.connection.remoteAddress}`)
            return res.status(400).json(formatError("Invalid auth token"))
        }
    }
}

module.exports = authorize;