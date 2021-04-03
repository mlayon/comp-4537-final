const db = require('../utils/database');
const _ = require('lodash');

// In memory object to grab the current count from db on first request to avoid 2 db queries per
// count. Lazy loading.
const counts = {

}

async function recordEndpointStats(req, res, next) {
    const endpoint = _.pick(req, ['originalUrl', 'method']);
    const index = [endpoint.originalUrl, endpoint.method];

    // Check if we have the count in memory, if not get it
    if (!(index in counts))
        counts[index] = (await db.getStat(...index))['requests'];

    console.log(counts);
    counts[index]++;
    db.setStat(...index, counts[index])
    next();
}

module.exports = recordEndpointStats;