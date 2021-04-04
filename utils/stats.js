const db = require('../utils/database');
const _ = require('lodash');

// In memory object to grab the current count from db on first request to avoid 2 db queries per
// count. Lazy loading.
const counts = {}

async function recordEndpointStats(req, res, next) {
    const fields = _.pick(req, ['path', 'method']);
    const index = [fields.path, fields.method];

    // Check if we have the count in memory, if not get it
    if (!(index in counts)) {
        let resp = await db.getStat(...index);

        // No endpoint stat in db, creating one
        if (!resp) {
            await db.addStat(...index);
            counts[index] = 0;
        } else {
            counts[index] = resp['requests'];
        }
    }


    // Increment count and push to db
    counts[index]++;
    db.setStat(...index, counts[index])

    next();
}

module.exports = recordEndpointStats;