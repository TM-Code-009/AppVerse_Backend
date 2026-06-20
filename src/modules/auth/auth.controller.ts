import { Request, Response } from "express";

import { loginAdmin } from "./auth.service";

import * as AuthService from "./auth.service";
import * as UserService from "../users/user.service";

import { generateToken } from "../../utils/generateToken";


// ======================
// ADMIN LOGIN
// ======================

export const adminLogin =
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


// ======================
// USER REGISTER
// ======================

export const register =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        name,
        email,
        password,
        role,
      } = req.body;

      const existing =
        await UserService.findByEmail(
          email
        );

      if (existing) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Email already exists",
          });
      }

      const hashedPassword =
        await AuthService.hashPassword(
          password
        );

      const user =
        await UserService.createUser({
          name,
          email,
          password:
            hashedPassword,
          role,
        });

      res.status(201).json({
        success: true,

        token:
          generateToken(
            user._id.toString()
          ),

        data: user,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Registration failed",
      });
    }
  };


// ======================
// USER LOGIN
// ======================

export const userLogin =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const {
        email,
        password,
      } = req.body;

      const user =
        await UserService.findByEmail(
          email
        );

      if (!user) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Invalid credentials",
          });
      }

      const match =
        await AuthService.comparePassword(
          password,
          user.password
        );

      if (!match) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Invalid credentials",
          });
      }

      res.status(200).json({
        success: true,

        token:
          generateToken(
            user._id.toString()
          ),

        data: user,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Login failed",
      });
    }
  };