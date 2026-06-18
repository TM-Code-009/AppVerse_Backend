import mongoose, {
  Document,
} from "mongoose";

export interface IApp
  extends Document {
  title: string;
  description: string;
  image: string;
  category: string;
  url: string;
  featured: boolean;
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