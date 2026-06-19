import mongoose, {
  Document,
} from "mongoose";

export interface IRequest
  extends Document {
  name: string;
  email: string;
  phone: string;
  appId: string;
  appTitle: string;
  message: string;
  status: string;
}

const requestSchema =
  new mongoose.Schema<IRequest>(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      appId: {
        type: String,
        required: true,
      },

      appTitle: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "Pending",
          "Contacted",
          "Closed",
        ],
        default: "Pending",
      },
    },
    {
      timestamps: true,
    }
  );

const Request =
  mongoose.model<IRequest>(
    "Request",
    requestSchema
  );

export default Request;