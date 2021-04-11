const { formatSuccess, formatError } = require('../../utils/respFormat');
const db = require('../../utils/database')
const _ = require('lodash')

const router = require('express').Router();

async function getAccount(req, resp) {
    const user = await db.getUser(req.user.email);

    // Shouldn't return is_admin but is here for this project to show things working
    resp.status(200).json(formatSuccess(_.pick(user, ['email', 'is_admin'])));
};

router.get('/', getAccount);

module.exports = router;