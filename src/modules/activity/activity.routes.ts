import { Router } from "express";

import * as ActivityController
from "./activity.controller";

const router = Router();

router.get(
  "/",
  ActivityController.getAll
);

export default router;