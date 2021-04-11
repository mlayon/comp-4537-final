const { formatSuccess } = require('../../utils/respFormat');
const db = require('../../utils/database');

const router = require('express').Router();

async function getStats(req, resp) {
    let stats = await db.getStats();
    resp.status(200).json(formatSuccess(stats));
};

router.get('/', getStats);

module.exports = router;