function recordEndpointStats(req, res, next) {
    console.log('Record data for', req.baseUrl, req.method);
}

module.exports = recordEndpointStats;