const express = require("express");
const router = express.Router();

const { addUser, signin } = require("../controller/userController");

router.post("/add-user", addUser);
router.post("/sign-in", signin);

module.exports = router;
