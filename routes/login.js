const { formatSuccess, formatError } = require('../utils/respFormat');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const db = require('./database')
const bcrypt = require('bcrypt');

const router = require('express').Router();

async function login(req, res) {
    let account = _.pick(req.body, ['email', 'password']);
    const user = await db.getUser(account.email);

    // No user registered
    if (!user)
        return res.status(400).send(formatError("Invalid login credentials"));

    const validPassword = bcrypt.compare(password, user['password']);
    if (!validPassword)
        return res.status(400).send(formatError("Invalid login credentials"));

    account = _.pick(account, ['username', 'email', 'is_admin'])
    return res.status(200).send(formatSuccess(jwt.sign(account, process.env.token_secret)))
}

router.post('/', login);

module.exports = router;