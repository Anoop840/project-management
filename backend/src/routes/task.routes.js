import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeOrgRoles } from "../middlewares/role.middleware.js";
import {
  createTask,
  getTasksByProject,
  updateTaskStatus,
  deleteTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", protect, authorizeOrgRoles(["Admin", "Manager"]), createTask);

router.get("/", protect, getTasksByProject);

router.patch(
  "/:taskId/status",
  protect,
  authorizeOrgRoles(["Admin", "Manager"]),
  updateTaskStatus
);

router.delete("/:taskId", protect, authorizeOrgRoles(["Admin"]), deleteTask);

export default router;
