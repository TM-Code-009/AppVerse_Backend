import { Request, Response } from "express";

import { loginAdmin } from "./auth.service";

import { generateToken } from "../../utils/generateToken";

export const login =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const { email, password } =
        req.body;

      const admin =
        await loginAdmin(
          email,
          password
        );

      const token =
        generateToken(
          admin._id.toString()
        );

      res.status(200).json({
        success: true,

        token,

        admin,
      });
    } catch (error) {
      res.status(401).json({
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Login failed",
      });
    }
  };