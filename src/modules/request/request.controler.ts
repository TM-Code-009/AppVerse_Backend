import {
  Request,
  Response,
} from "express";

import * as RequestService from "./request.service";

import * as ActivityService from "../activity/activity.service";

export const create =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const request =
        await RequestService.createRequest(
          req.body
        );

      await ActivityService.createActivity(
        "NEW_REQUEST",
        `${request.name} requested ${request.appTitle}`
      );

      res.status(201).json({
        success: true,
        data: request,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to create request",
      });
    }
  };

export const getAll =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const requests =
        await RequestService.getRequests();

      res.json({
        success: true,
        data: requests,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  };

export const update =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = String(req.params.id);

const request =
  await RequestService.updateStatus(
    id,
    req.body.status
  );

      res.json({
        success: true,
        data: request,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  };