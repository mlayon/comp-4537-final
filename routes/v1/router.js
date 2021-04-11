const router = require("express").Router();

// middleware
const authorize = require("../../middleware/authorize");
const dataValidator = require("../../middleware/dataValidation");

// Routers
const loginRouter = require('./login');
const accountRouter = require('./accounts');
const registerRouter = require('./register');
const postRouter = require('./posts');
const commentRouter = require('./comments');
const statsRouter = require('./stats');

router.use(dataValidator);

// TODO: add versioning to the path. 
router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use(authorize(false));
router.use("/account", accountRouter);

router.use("/post", postRouter);
router.use("/comment", commentRouter);

router.use(authorize(true));
router.use("/stats", statsRouter);


module.exports = router;