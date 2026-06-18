import { Router } from "express";

import authRoutes from "../modules/auth/auth.route";
import appRoutes from "../modules/apps/app.routes";
// import suggestionRoutes from "../modules/suggestions/suggestion.routes";
// import hireRoutes from "../modules/hire/hire.routes";
import dashboardRoutes from "../modules/dashboard/dashboard.routes";


const router = Router();

router.use(
    "/auth",
    authRoutes
);

router.use(
    "/apps",
    appRoutes
);

// router.use(
//   "/suggestions",
//   suggestionRoutes
// );

// router.use(
//   "/hire",
//   hireRoutes
// );

router.use(
  "/dashboard",
  dashboardRoutes
);

router.get("/", (_, res) => {
  res.json({
    message:
      "AppVerse API Running",
  });
});

export default router;