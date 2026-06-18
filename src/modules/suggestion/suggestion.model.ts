import mongoose, {
  Document,
} from "mongoose";

export interface ISuggestion
  extends Document {
  name: string;
  email: string;
  suggestion: string;
}

const suggestionSchema =
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

      suggestion: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Suggestion",
  suggestionSchema
);