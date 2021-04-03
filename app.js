require('dotenv').config()

const express = require("express");
const querystring = require("querystring");
const cors = require("cors");
const morgan = require("morgan");
const authorize = require("./utils/authorize");
const { pool } = require("./config");

const accountRoute = require('./routes/accounts');
const postRoute = require('./routes/posts');
const commentRoute = require('./routes/comments');
const statsRoute = require('./routes/stats');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('tiny'));

// TODO: Change to allow access only from known forum url
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/login", )

app.use(authorize);

app.get("/account", accountRoute.getAccount);
app.post("/account", accountRoute.addAccount);


app.get("/post", postRoute.getPost);
app.post("/post", postRoute.addPost);
app.put("/post", postRoute.updatePost);
app.delete("/post", postRoute.deletePost);

app.get("/post/all", postRoute.getAllPosts);

app.get("/comment", commentRoute.getComment);
app.post("/comment", commentRoute.addComment)
app.put("/comment", commentRoute.updateComment)
app.delete("/comment", commentRoute.deleteComment);

app.get("/stats", statsRoute.getStats);

// app
// 	.route("/login")
// 	// POST /login
// 	.post(login)

// app
// 	.route("/admin")
// 	// POST /admin
// 	.post(loginAdmin)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});