const Task = require("../models/taskModel");

exports.getTaskById = (req, res) => {
    Task.findById(req.body.id)
        .then((result) => {
            return res.status(200).json({ task: result });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};

exports.getAllTasksByUserId = (req, res) => {
    Task.find({ user: req.user._id })
        .then((result) => {
            return res.status(200).json({ tasks: result });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};

exports.addATask = (req, res) => {
    const { taskName, tags } = req.body;

    if (!taskName || !tags)
        return res.status(400).json({ error: "Invelid Input" });

    const task = new Task({
        taskName,
        tags,
        taskStatus: "not working",
        user: req.user._id,
    });

    task.save()
        .then(() => res.status(200).json({ message: "Task added" }))
        .catch((error) => res.status(400).json({ error: error.message }));
};

exports.changeTaskById = (req, res) => {
    const { id } = req.params;
    const { taskName, tags, taskStatus } = req.body;

    if (!taskName || !tags || !taskStatus)
        return res.status(400).json({ error: "Invelid Input" });

    Task.findByIdAndUpdate(id, { taskName, tags, taskStatus }, { new: true })
        .then((task) => {
            return res.status(200).json({ message: "Task updated", task });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};

exports.deleteTaskById = (req, res) => {
    const { id } = req.params;

    Task.findByIdAndRemove(id)
        .then(() => {
            return res.status(200).json({ message: "Task deleted" });
        })
        .catch((error) => res.status(400).json({ error: error.message }));
};
