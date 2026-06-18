import App from "./app.model";

export const createApp = async (
  data: any
) => {
  return await App.create(data);
};

export const getApps = async (
  search?: string,
  page: number = 1
) => {
  const limit = 10;

  const skip =
    (page - 1) * limit;

  const filter = search
    ? {
        title: {
          $regex: search,
          $options: "i",
        },
      }
    : {};

  return await App.find(filter)
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);
};

export const getFeaturedApps =
  async () => {
    return await App.find({
      featured: true,
    }).sort({
      createdAt: -1,
    });
  };

export const getApp = async (
  id: string
) => {
  return await App.findById(id);
};

export const updateApp =
  async (
    id: string,
    data: any
  ) => {
    return await App.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );
  };

export const deleteApp =
  async (id: string) => {
    return await App.findByIdAndDelete(
      id
    );
  };

export const getAppsCount =
  async () => {
    return await App.countDocuments();
  };