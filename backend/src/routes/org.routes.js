import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  createOrganization,
  getMyOrganizations,
} from "../controllers/org.controller.js";

const router = express.Router();

router.post("/", protect, createOrganization);
router.get("/", protect, getMyOrganizations);

export default router;
