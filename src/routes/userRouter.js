const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");
const {
    addUser,
    signinUser,
    deleteUser,
    getUserById,
    changeUserById,
} = require("../controller/userController");

router.post("/add-user", addUser);
router.post("/sign-in", signinUser);
router.get("/:id", checkAuth, getUserById);
router.put("/:id", checkAuth, changeUserById);
router.delete("/:id", checkAuth, deleteUser);

module.exports = router;
