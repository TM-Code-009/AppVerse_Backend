import mongoose, {
  Document,
} from "mongoose";

export interface IHire
  extends Document {
  name: string;
  email: string;
  budget: string;
  projectType: string;
  description: string;
}

const hireSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      budget: {
        type: String,
        required: true,
      },

      projectType: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Hire",
  hireSchema
);