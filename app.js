require("dotenv").config()

const express = require("express");
const projectDescription = require("./projectDescription")

// Middleware
const morgan = require("morgan");
const cors = require("cors");
const statsRecorder = require("./middleware/stats");

// Routers
const v1Router = require("./routes/v1/router");
const v2Router = require("./routes/v2/router");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(statsRecorder);

// TODO: Change to allow access only from known forum url
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authToken");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.get("/", function(req, res) {
    return res.status(200).send(projectDescription);
});

app.use("/v1", v1Router);
app.use("/v2", v2Router);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});