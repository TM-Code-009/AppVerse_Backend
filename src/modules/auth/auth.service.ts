import bcrypt from "bcryptjs";

import Admin from "./auth.model";

export const loginAdmin =
  async (
    email: string,
    password: string
  ) => {
    const admin =
      await Admin.findOne({
        email,
      });

    if (!admin) {
      throw new Error(
        "Invalid credentials"
      );
    }

    const match =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!match) {
      throw new Error(
        "Invalid credentials"
      );
    }

    return admin;
  };

export const hashPassword =
  async (
    password: string
  ) => {
    return bcrypt.hash(
      password,
      10
    );
  };

export const comparePassword =
  async (
    password: string,
    hash: string
  ) => {
    return bcrypt.compare(
      password,
      hash
    );
  };