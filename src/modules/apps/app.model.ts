import mongoose, {
  Document,
  Types,
} from "mongoose";

export interface IApp
  extends Document {
  title: string;
  description: string;
  image: string;
  category: string;
  url: string;
  demoUrl: string;
  status: string;
  featured: boolean;
  price: number;
  developer: Types.ObjectId;
}

const appSchema =
  new mongoose.Schema<IApp>(
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      image: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        required: true,
      },

      featured: {
        type: Boolean,
        default: false,
      },
      price: {
  type: Number,
  default: 0,
},
demoUrl: {
  type: String,
  default: "",
},

status: {
  type: String,
  enum: [
    "Available",
    "Coming Soon",
    "Sold",
  ],
  default: "Available",
},
developer: {
  type:
    mongoose.Schema.Types.ObjectId,

  ref: "User",

  required: true,
},
    },
    {
      timestamps: true,
    }
  );

const App =
  mongoose.model<IApp>(
    "App",
    appSchema
  );

export default App;