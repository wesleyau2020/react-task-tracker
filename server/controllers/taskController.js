const Task = require("../models/task");

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  const { text, completed, date } = req.body;
  try {
    const task = await Task.create({ text, completed, date });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a task by ID
exports.getTaskById = async (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  try {
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const { text, completed } = req.body;
  try {
    const [updated] = await Task.update(
      { text, completed },
      {
        where: { id: taskId },
      },
    );
    if (updated === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    const updatedTask = await Task.findByPk(taskId);
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  try {
    const deleted = await Task.destroy({
      where: { id: taskId },
    });
    if (deleted === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
