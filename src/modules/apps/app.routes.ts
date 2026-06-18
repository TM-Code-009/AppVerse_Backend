import { Router } from "express";

import * as AppController from "./app.controller";

import { protect } from "../../middleware/authmiddleware";
import { upload }
from "../../middleware/upload";

const router = Router();

router.get(
  "/",
  AppController.getAll
);

router.get(
  "/:id",
  AppController.getOne
);

// router.post(
//   "/",
//   protect,
//   AppController.create
// );

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


router.post(
  "/",
  protect,
  upload.single("image"),
  AppController.create
);

export default router;