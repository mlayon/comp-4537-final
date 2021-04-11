require('dotenv').config()

const express = require("express");

// Middleware
const morgan = require("morgan");
const authorize = require("./middleware/authorize");
const statsRecorder = require("./middleware/stats");
const dataValidator = require("./middleware/dataValidation");

// Routers
const loginRouter = require('./routes/login');
const accountRouter = require('./routes/accounts');
const postRouter = require('./routes/posts');
const commentRouter = require('./routes/comments');
const statsRouter = require('./routes/stats');

const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(statsRecorder);
app.use(dataValidator);

// TODO: Change to allow access only from known forum url
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authToken");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.get("/", function(req, res) {
    return res.status(200).send("Hello World!");
});

// TODO: add versioning to the path. 
app.use("/login", loginRouter);
app.use("/account", accountRouter);
app.use(authorize(false));

app.use("/post", postRouter);
app.use("/comment", commentRouter);

app.use(authorize(true));
app.use("/stats", statsRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});