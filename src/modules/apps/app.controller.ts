import {
  Request,
  Response,
} from "express";

import * as AppService from "./app.service";
import cloudinary
  from "../../config/cloudinary";
  import * as ActivityService
from "../activity/activity.service";


export const create = async (
  req: Request,
  res: Response
) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const uploaded =
        await new Promise<any>(
          (
            resolve,
            reject
          ) => {
            cloudinary.uploader
              .upload_stream(
                {
                  folder:
                    "appverse",
                },
                (
                  error,
                  result
                ) => {
                  if (error)
                    reject(
                      error
                    );

                  resolve(
                    result
                  );
                }
              )
              .end(
                req.file?.buffer
              );
          }
        );

      imageUrl =
        uploaded.secure_url;
    }

    const app =
      await AppService.createApp(
        {
          ...req.body,
          image:
            imageUrl,
        }
      );
      await ActivityService.createActivity(
  "NEW_APP",
  `New app added: ${app.title}`
);

      console.log(
      "BODY =>",
      req.body
    );

    console.log(
      "FILE =>",
      req.file
    );

    res.status(201).json({
      success: true,
      data: app,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to create app",
    });
  }
};

export const getAll = async (
  req: Request,
  res: Response
) => {
  try {
    const search =
      req.query.search as string;

    const page =
      Number(req.query.page) || 1;

    const apps =
      await AppService.getApps(
        search,
        page
      );

    res.json({
      success: true,
      data: apps,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch apps",
    });
  }
};

export const getOne = async (
  req: Request,
  res: Response
) => {
  try {
    const app =
      await AppService.getApp(
        String(req.params.id)
      );

    if (!app) {
      return res.status(404).json({
        success: false,
        message:
          "App not found",
      });
    }

    res.json({
      success: true,
      data: app,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch app",
    });
  }
};

export const featured =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const apps =
        await AppService.getFeaturedApps();

      res.json({
        success: true,
        data: apps,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch featured apps",
      });
    }
  };

export const update = async (
  req: Request,
  res: Response
) => {
  try {
    const app =
      await AppService.updateApp(
        String(req.params.id),
        req.body
      );

    if (!app) {
      return res.status(404).json({
        success: false,
        message:
          "App not found",
      });
    }

    res.json({
      success: true,
      data: app,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to update app",
    });
  }
};

export const remove =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const app =
        await AppService.deleteApp(
          String(req.params.id)
        );

      if (!app) {
        return res.status(404).json({
          success: false,
          message:
            "App not found",
        });
      }

      res.json({
        success: true,
        message:
          "App deleted successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to delete app",
      });
    }
  };``