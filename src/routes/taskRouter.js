const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");
const {
    getAllTasksByUserId,
    addATask,
    changeTaskById,
    deleteTaskById,
} = require("../controller/taskController");

router.get("/", checkAuth, getAllTasksByUserId);
router.post("/add", checkAuth, addATask);
router.put("/:id", checkAuth, changeTaskById);
router.delete("/:id", checkAuth, deleteTaskById);

module.exports = router;
