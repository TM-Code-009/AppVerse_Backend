import dotenv from "dotenv";

dotenv.config();

import bcrypt from "bcryptjs";

import { connectDB } from "../config/db";

import Admin from "../modules/auth/auth.model";

const seed = async () => {
  await connectDB();

  const exists =
    await Admin.findOne({
      email:
        process.env.ADMIN_EMAIL,
    });

  if (exists) {
    console.log(
      "Admin exists"
    );

    process.exit();
  }

  const password =
    await bcrypt.hash(
      process.env
        .ADMIN_PASSWORD!,
      10
    );

  await Admin.create({
    email:
      process.env.ADMIN_EMAIL,

    password,
  });

  console.log(
    "Admin created"
  );

  process.exit();
};

seed();