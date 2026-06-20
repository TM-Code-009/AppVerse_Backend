import { Router } from "express";

import * as UserController
from "./user.controller";

import { userProtect }
from "../../middleware/userProtect";

const router = Router();

router.get(
  "/profile",
  userProtect,
  UserController.getProfile
);

router.patch(
  "/profile",
  userProtect,
  UserController.updateProfile
);

router.post(
  "/follow/:id",
  userProtect,
  UserController.followUser
);

router.post(
  "/save-app/:appId",
  userProtect,
  UserController.saveApp
);

router.get(
  "/developer/:id",
  UserController.getDeveloper
);

router.get(
  "/developer/:id/apps",
  UserController.getDeveloperApps
);

export default router;