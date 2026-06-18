import {
  Request,
  Response,
  NextFunction,
} from "express";

import jwt from "jsonwebtoken";

import Admin from "../modules/auth/auth.model";

export interface AuthRequest
  extends Request {
  admin?: any;
}

export const protect =
  async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authHeader =
        req.headers.authorization;

      if (
        !authHeader ||
        !authHeader.startsWith(
          "Bearer "
        )
      ) {
        return res
          .status(401)
          .json({
            message:
              "Unauthorized",
          });
      }

      const token =
        authHeader.split(
          " "
        )[1];

      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as {
          id: string;
        };

      const admin =
        await Admin.findById(
          decoded.id
        );

      if (!admin) {
        return res
          .status(401)
          .json({
            message:
              "Unauthorized",
          });
      }

      req.admin = admin;

      next();
    } catch {
      return res
        .status(401)
        .json({
          message:
            "Unauthorized",
        });
    }
  };