import { Router } from "express";

import * as AppController from "./app.controller";

import { protect } from "../../middleware/authmiddleware";
import { upload }
from "../../middleware/upload";

const router = Router();

router.get(
  "/featured",
  AppController.featured
);

router.get(
  "/",
  AppController.getAll
);

router.get(
  "/:id",
  AppController.getOne
);

router.post(
  "/",
  protect,
  upload.single("image"),
  AppController.create
);

router.patch(
  "/:id",
  protect,
  AppController.update
);

router.delete(
  "/:id",
  protect,
  AppController.remove
);

router.get(
  "/featured",
  AppController.featured
);

router.get(
  "/:id",
  AppController.getOne
);



export default router;