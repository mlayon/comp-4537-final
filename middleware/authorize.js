const _ = require('lodash');
const jwt = require('jsonwebtoken');
const db = require('../utils/database');
const { formatError } = require('../utils/respFormat');

function checkAuthToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
            if (err) resolve(null)
            else resolve(decode)
        })
    })
}

function authorize(adminOnly = false) {
    return async function(req, res, next) {
        const decodeToken = await checkAuthToken(req.get('authToken'))
        if (decodeToken) {
            console.info(`Valid auth token from ${req.connection.remoteAddress}`)

            req.user = await db.getUser(decodeToken.email);
            if (!req.user) {
                console.info(`Invalid auth token from ${req.connection.remoteAddress}`)
                return res.status(401).json(formatError("Invalid auth token"))
            }


            if (adminOnly && !req.user.is_admin) {
                console.info(`Invalid auth level from ${req.connection.remoteAddress}`)
                return res.status(401).json(formatError("Invalid auth level"))
            }

            // Store full user object for easier use
            req.user = await db.getUser(req.user.email);

            next()
        } else {
            console.info(`Invalid auth token from ${req.connection.remoteAddress}`)
            return res.status(401).json(formatError("Invalid auth token"))
        }
    }
}

module.exports = authorize;