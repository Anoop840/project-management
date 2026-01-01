import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const { title, description, priority, assignedTo, dueDate, projectId } =
    req.body;

  const task = await Task.create({
    title,
    description,
    priority,
    assignedTo,
    dueDate,
    project: projectId,
  });

  res.status(201).json(task);
};

export const getTasksByProject = async (req, res) => {
  const { projectId } = req.query;

  const tasks = await Task.find({ project: projectId })
    .populate("assignedTo", "name email")
    .sort({ createdAt: -1 });

  res.json(tasks);
};

export const updateTaskStatus = async (req, res) => {
  const { status } = req.body;

  const task = await Task.findById(req.params.taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.status = status;
  await task.save();

  res.json(task);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.taskId);
  res.json({ message: "Task deleted" });
};
