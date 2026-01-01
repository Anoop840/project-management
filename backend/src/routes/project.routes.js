import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeOrgRoles } from "../middlewares/role.middleware.js";
import { createProject } from "../controllers/project.controller.js";
import { getProjects } from "../controllers/project.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeOrgRoles(["Admin", "Manager"]),
  createProject
);
router.get("/", protect, getProjects);

export default router;
