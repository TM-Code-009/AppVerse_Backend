import { Router } from "express";
import * as DashboardController from "./dashboard.controller";

const router = Router();

router.get(
  "/stats",
  DashboardController.stats
);

router.get(
  "/recent-activity",
  DashboardController.activity
);

export default router;