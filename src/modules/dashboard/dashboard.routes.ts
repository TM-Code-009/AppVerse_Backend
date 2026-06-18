import { Router } from "express";

import * as DashboardController
from "./dashboard.controller";

import { protect }
from "../../middleware/authmiddleware";

const router = Router();

router.get(
  "/stats",
  protect,
  DashboardController.stats
);
router.get(
  "/recent-activity",
  protect,
  DashboardController.activity
);

export default router;