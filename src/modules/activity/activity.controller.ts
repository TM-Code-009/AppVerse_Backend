import {
  Request,
  Response,
} from "express";

import * as ActivityService
from "./activity.service";

export const getAll =
  async (
    req: Request,
    res: Response
  ) => {
    const activities =
      await ActivityService.getActivities();

    res.json({
      success: true,
      data: activities,
    });
  };