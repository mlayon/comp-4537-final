const { formatSuccess, formatError } = require('../utils/respFormat');
const router = require('express').Router();

function getStats(request, response) {
    pool.query("SELECT * FROM stats", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

module.exports = {
    getStats
}