const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("TO DO APP");
});

app.listen(port, () =>
    mongoose
        .connect(process.env.URI)
        .then(() => console.log("Server is up and running"))
        .catch((error) => console.log(error))
);
