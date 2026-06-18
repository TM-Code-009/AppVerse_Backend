import { Router } from "express";

import * as HireController
from "./hire.controller";

import { protect }
from "../../middleware/authmiddleware";

const router = Router();

router.post(
  "/",
  HireController.create
);

router.get(
  "/",
  protect,
  HireController.getAll
);

router.delete(
  "/:id",
  protect,
  HireController.remove
);

export default router;