import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import { protect } from "./middlewares/auth.middleware.js";
import orgRoutes from "./routes/org.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/orgs", orgRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});

export default app;
