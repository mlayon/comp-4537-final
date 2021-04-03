const { formatSuccess, formatError } = require('../utils/respFormat');
const db = require('../utils/database')
const bcrypt = require('bcrypt');
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

    let emailTaken = await db.getUser(user.email);
    if (emailTaken)
        return resp.status(409).json(formatError("Email is taken."))

    await db.createUser(user.username, bcrypt.hashSync(user.password, saltRounds), user.email);

    // JWT creation should be pulled into a util function
    account = _.pick(account, ['username', 'email', 'is_admin'])
    let jwt = jwt.sign(account, process.env.token_secret)

    resp.status(200).json(formatSuccess(jwt));
};

router.get('/', getAccount);
router.post('/', addAccount);

module.exports = router;