const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
    res.send("TO DO APP");
});

app.use("/api/v1/user", require("./routes/userRouter"));
app.use("/api/v1/task", require("./routes/taskRouter"));

app.listen(port, () =>
    mongoose
        .connect(process.env.URI)
        .then(() => console.log("Server is up and running in port : " + port))
        .catch((error) => console.log(error))
);
