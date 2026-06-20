import mongoose, {
  Document,
} from "mongoose";

export interface IUser
  extends Document {
  name: string;

  email: string;

  password: string;

  avatar: string;

  skills:string;

  bio: string;

  role:
    | "admin"
    | "developer"
    | "client";

  followers: mongoose.Types.ObjectId[];

  following: mongoose.Types.ObjectId[];

  savedApps: mongoose.Types.ObjectId[];
}

const userSchema =
  new mongoose.Schema<IUser>(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
      },

      password: {
        type: String,
        required: true,
      },

      avatar: {
        type: String,
        default: "",
      },
      skills: [
  {
    type: String,
  },
],

      bio: {
        type: String,
        default: "",
      },

      role: {
        type: String,
        enum: [
          "admin",
          "developer",
          "client",
        ],
        default: "client",
      },

      followers: [
        {
          type:
            mongoose.Schema.Types
              .ObjectId,

          ref: "User",
        },
      ],

      following: [
        {
          type:
            mongoose.Schema.Types
              .ObjectId,

          ref: "User",
        },
      ],

      savedApps: [
        {
          type:
            mongoose.Schema.Types
              .ObjectId,

          ref: "App",
        },
      ],
    },
    {
      timestamps: true,
    }
  );

const User =
  mongoose.model<IUser>(
    "User",
    userSchema
  );

export default User;