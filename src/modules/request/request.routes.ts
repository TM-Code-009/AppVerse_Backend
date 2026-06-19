import { Router } from "express";

import * as RequestController from "./request.controler";

import { protect } from "../../middleware/authmiddleware";

const router = Router();

router.post(
  "/",
  RequestController.create
);

router.get(
  "/",
  protect,
  RequestController.getAll
);

router.patch(
  "/:id",
  protect,
  RequestController.update
);

export default router;