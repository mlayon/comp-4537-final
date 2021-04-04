const { formatSuccess, formatError } = require('../utils/respFormat');
const db = require('../utils/database')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const router = require('express').Router();
const saltRounds = 10;

async function getAccount(req, resp) {
    let email = _.pick(req.body, ['email']);
    const users = await db.getUser(email);
    resp.status(200).json(formatSuccess(users));
};

// sample data
// {
//     "username": "test",
//     "password": "password",
//     "email": "test@email.com"
// }
async function addAccount(req, resp) {
    let user = _.pick(req.body, ['username', 'password', 'email']);

    let usernameTaken = await db.getUserByUsername(user.username);
    if (usernameTaken)
        return resp.status(409).json(formatError("Username is taken."))

    let emailTaken = await db.getUser(user.email);
    if (emailTaken)
        return resp.status(409).json(formatError("Email is taken."))

    await db.createUser(user.username, bcrypt.hashSync(user.password, saltRounds), user.email);

    // JWT creation should be pulled into a util function
    user = _.pick(user, ['username', 'email', 'is_admin'])
    let token = jwt.sign(user, process.env.TOKEN_SECRET)

    resp.status(200).json(formatSuccess(token));
};

router.get('/', getAccount);
router.post('/', addAccount);

module.exports = router;