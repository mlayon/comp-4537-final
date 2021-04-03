function recordEndpointStats(req, res, next) {
    console.log('Record stats!');
    next();
}

module.exports = recordEndpointStats;