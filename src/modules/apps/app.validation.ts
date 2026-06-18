import { z } from "zod";

export const createAppSchema =
  z.object({
    title: z.string(),

    description: z.string(),

    image: z.string(),

    category: z.string(),

    url: z.url(),

    featured:
      z.boolean().optional(),
  });