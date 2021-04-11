const router = require("express").Router();

router.use('/', (req, res) => {
    res.status(200).send("V2 coming to servers near you!");
});

module.exports = router;