import Task from "../models/Task.js";
import asyncHandler from "../utils/asyncHandler.js";

// CREATE TASK
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  const task = await Task.create({
    title,
    description,
    priority,
    dueDate,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    task,
  });
});

// GET TASKS WITH SEARCH + FILTER + PAGINATION
export const getTasks = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;

  const limit = Number(req.query.limit) || 5;

  const skip = (page - 1) * limit;

  const search = req.query.search || "";

  const status = req.query.status || "";

  let query = {
    user: req.user._id,
  };

  // Search
  if (search) {
    query.title = {
      $regex: search,
      $options: "i",
    };
  }

  // Filter
  if (status) {
    query.status = status;
  }

  const totalTasks = await Task.countDocuments(query);

  const tasks = await Task.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    totalTasks,
    currentPage: page,
    totalPages: Math.ceil(totalTasks / limit),
    tasks,
  });
});

// UPDATE TASK
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);

    throw new Error("Task not found");
  }

  // Ownership check
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(403);

    throw new Error("Unauthorized access");
  }

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    task: updatedTask,
  });
});

// DELETE TASK
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);

    throw new Error("Task not found");
  }

  if (task.user.toString() !== req.user._id.toString()) {
    res.status(403);

    throw new Error("Unauthorized access");
  }

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});

// TOGGLE TASK STATUS
export const toggleTaskStatus = asyncHandler(async (req, res) => {
  console.log("Updating task:", req.params.id);
  console.log("Request body:", req.body);

  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);

    throw new Error("Task not found");
  }

  // Ownership check
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(403);

    throw new Error("Unauthorized access");
  }

  if (req.body.status) {
    task.status = req.body.status;
  } else {
    task.status = task.status === "pending" ? "completed" : "pending";
  }

  await task.save();

  res.status(200).json({
    success: true,
    message: "Task status updated",
    task,
  });
});