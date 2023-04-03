const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");
const {
    addUser,
    signinUser,
    deleteUser,
} = require("../controller/userController");

router.post("/add-user", addUser);
router.post("/sign-in", signinUser);
router.delete("/", checkAuth, deleteUser);

module.exports = router;
