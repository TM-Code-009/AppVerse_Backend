import { Router } from "express";

import * as SuggestionController
from "./suggestion.controller";

import { protect }
from "../../middleware/authmiddleware";

const router = Router();

router.post(
  "/",
  SuggestionController.create
);

router.get(
  "/",
  protect,
  SuggestionController.getAll
);

router.delete(
  "/:id",
  protect,
  SuggestionController.remove
);

export default router;