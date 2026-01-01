import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  createOrganization,
  getMyOrganizations,
  deleteOrganization,
} from "../controllers/org.controller.js";
import { authorizeOrgRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", protect, createOrganization);
router.get("/", protect, getMyOrganizations);
router.delete(
  "/:orgId",
  protect,
  authorizeOrgRoles(["Admin"]),
  deleteOrganization
);

export default router;
