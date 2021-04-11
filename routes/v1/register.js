const { formatSuccess, formatError } = require('../../utils/respFormat');
const db = require('../../utils/database')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const router = require('express').Router();
const saltRounds = 10;

// sample data
// {
//     "password": "password",
//     "email": "test@email.com"
// }
async function addAccount(req, resp) {
    let user = _.pick(req.body, ['password', 'email']);

    let emailTaken = await db.getUser(user.email);
    if (emailTaken)
        return resp.status(409).json(formatError("Email is taken."))

    await db.createUser(bcrypt.hashSync(user.password, saltRounds), user.email);

    // JWT creation should be pulled into a util function
    user = _.pick(user, ['email'])
    let token = jwt.sign(user, process.env.TOKEN_SECRET)

    resp.status(200).json(formatSuccess(token));
};

router.post('/', addAccount);

module.exports = router;