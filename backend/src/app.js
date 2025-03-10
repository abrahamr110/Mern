const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT;
const database = require("./database");

database.connect();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.set("port", port);
app.use("/api/usuario", require("./routes/usuario"));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

module.exports = app;
