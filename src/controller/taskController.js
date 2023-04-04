const Task = require("../models/taskModel");

exports.getAllTasksByUserId = (req, res) => {};

exports.addATask = (req, res) => {
    const { taskName, tags } = req.body;

    if (!taskName || !tags)
        return res.status(400).json({ error: "Invelid Input" });

    const task = new Task({
        taskName,
        tags,
        taskStatus: "not started",
        user: req.user._id,
    });

    task.save()
        .then(() => res.status(200).json({ message: "Task added" }))
        .catch((error) => res.status(400).json({ error: error.message }));
};

exports.changeTaskById = (req, res) => {};

exports.deleteTaskById = (req, res) => {};
