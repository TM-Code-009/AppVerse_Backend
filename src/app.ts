import express from "express";
import cors from "cors";
import activityRoutes
from "./modules/activity/activity.routes";
import routes from "./routes";
import dashboardRoutes
from "./modules/dashboard/dashboard.routes";
import suggestionRoutes
from "./modules/suggestion/suggstion.routes";
import hireRoutes
from "./modules/hire/hire.routes";
import requestRoutes
from "./modules/request/request.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/hire",
  hireRoutes
);

app.use(
  "/api/suggestions",
  suggestionRoutes
);

app.use(
  "/api/activity",
  activityRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/requests",
  requestRoutes
);

app.use("/api", routes);

export default app;