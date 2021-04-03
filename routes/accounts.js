const db = require('../utils/database')
const router = require('express').Router();
const _ = require('lodash');

function getAccount(req, resp) {
    let email = _.pick(req.body, ['email']);
    const users = await db.getUsers(email);
    resp.status(200).json(users);
};

// sample data
// {
//     "username": "test",
//     "password": "password",
//     "email": "test@email.com"
// }
function addAccount(req, resp) {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    db.createUser(username, password, email);

    resp
        .status(201)
        .json({ status: "success", message: "Account added." });
};

router.get('/', getAccount);
router.post('/', addAccount);

module.exports = router;