import express from "express";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} from "../controllers/taskController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected Routes
router.use(protect);

router.route("/")
  .post(createTask)
  .get(getTasks);

router.route("/:id")
  .put(updateTask)
  .delete(deleteTask);

router.patch("/:id/toggle", toggleTaskStatus);

export default router;