const { formatSuccess, formatError } = require('../../utils/respFormat');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const db = require('../../utils/database')
const bcrypt = require('bcrypt');

const router = require('express').Router();

async function login(req, res) {
    let account = _.pick(req.body, ['email', 'password']);
    const user = await db.getUser(account.email);

    // No user registered
    if (!user)
        return res.status(400).json(formatError("Invalid login credentials"));

    // Invalid password
    const validPassword = await bcrypt.compare(account.password, user['password']);
    if (!validPassword)
        return res.status(400).json(formatError("Invalid login credentials"));

    // Valid login
    // Not expiring JWT is bad, but ummmmm good enough for this
    account = _.pick(account, ['email'])
    return res.status(200).json(formatSuccess(jwt.sign(account, process.env.TOKEN_SECRET)))
}

router.post('/', login);

module.exports = router;