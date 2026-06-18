import Activity from "./activity.model";

export const createActivity =
  async (
    type: string,
    message: string
  ) => {
    console.log(
      "Creating Activity:",
      type,
      message
    );

    return Activity.create({
      type,
      message,
    });
  };

export const getActivities =
  async () => {
    return Activity.find()
      .sort({
        createdAt: -1,
      })
      .limit(20);
  };