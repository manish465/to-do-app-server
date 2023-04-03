const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRouter = require("./routes/userRouter");

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (_req, res) => {
    res.send("TO DO APP");
});

app.use("/api/v1/user", userRouter);

app.listen(port, () =>
    mongoose
        .connect(process.env.URI)
        .then(() => console.log("Server is up and running in port : " + port))
        .catch((error) => console.log(error))
);
