const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");
const {
    getAllTasksByUserId,
    addATask,
    changeTaskById,
    deleteTaskById,
    getTaskById,
} = require("../controller/taskController");

router.get("/", checkAuth, getAllTasksByUserId);
router.get("/:id", checkAuth, getTaskById);
router.post("/add", checkAuth, addATask);
router.put("/:id", checkAuth, changeTaskById);
router.delete("/:id", checkAuth, deleteTaskById);

module.exports = router;
