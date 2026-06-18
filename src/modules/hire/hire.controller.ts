import {
  Request,
  Response,
} from "express";

import * as HireService
from "./hire.service";

import * as ActivityService
from "../activity/activity.service";
import { sendEmail } from "../../utils/sendEmail";

export const create =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const hire =
        await HireService.createHire(
          req.body
        );

        await sendEmail(
  "New Hire Request",

  `
  <h2>New Hire Request</h2>

  <p><strong>Name:</strong>
  ${hire.name}</p>

  <p><strong>Email:</strong>
  ${hire.email}</p>

  <p><strong>Budget:</strong>
  ${hire.budget}</p>

  <p><strong>Project Type:</strong>
  ${hire.projectType}</p>

  <p><strong>Description:</strong>
  ${hire.description}</p>
  `
);

      await ActivityService.createActivity(
        "NEW_HIRE_REQUEST",
        `New hire request from ${hire.name}`
      );

      res.status(201).json({
        success: true,
        data: hire,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  };

export const getAll =
  async (
    req: Request,
    res: Response
  ) => {
    const hires =
      await HireService.getHires();

    res.json({
      success: true,
      data: hires,
    });
  };


  export const remove =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const hire =
        await HireService.deleteHire(
          String(req.params.id)
        );

      if (!hire) {
        return res.status(404).json({
          success: false,
          message:
            "Hire request not found",
        });
      }

      res.json({
        success: true,
        message:
          "Hire request deleted",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  };