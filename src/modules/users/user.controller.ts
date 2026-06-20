import {
  Request,
  Response,
} from "express";

import * as UserService from "./user.service";

import { AuthRequest }
from "../../middleware/userProtect";

export const getProfile =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const user =
        await UserService.findById(
          req.user!._id
        );

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  };

export const updateProfile =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const user =
        await UserService.updateProfile(
          req.user!._id,
          req.body
        );

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  };

export const followUser =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const user =
  await UserService.saveApp(
    String(req.user!._id),
    String(req.params.appId)
  );

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.log(error);

      res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed",
      });
    }
  };

export const saveApp =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
     const user =
  await UserService.followUser(
    String(req.user!._id),
    String(req.params.id)
  );

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.log(error);

      res.status(400).json({
        success: false,
      });
    }
  };

  export const getDeveloper =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const user =
        await UserService.getDeveloper(
          String(
            req.params.id
          )
        );

      if (!user) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Developer not found",
          });
      }

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  };

export const getDeveloperApps =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const apps =
        await UserService.getDeveloperApps(
          String(
            req.params.id
          )
        );

      res.json({
        success: true,
        data: apps,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  };