import {
  Request,
  Response,
} from "express";

import * as DashboardService
from "./dashboard.service";

export const stats =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const data =
        await DashboardService.getStats();

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  };

  export const activity =
  async (
    req: Request,
    res: Response
  ) => {
    const data =
      await DashboardService.recentActivity();

    res.json({
      success: true,
      data,
    });
  };