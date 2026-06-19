import App from "../apps/app.model";
import Suggestion from "../suggestion/suggestion.model";
import Hire from "../hire/hire.model";
import Activity from "../activity/activity.model";

export const getStats =
  async () => {
    const totalApps =
      await App.countDocuments();

    const featuredApps =
      await App.countDocuments({
        featured: true,
      });

    const suggestions =
      await Suggestion.countDocuments();

    const hires =
      await Hire.countDocuments();

    const activities =
      await Activity.countDocuments();

    return {
      totalApps,
      featuredApps,
      suggestions,
      hires,
      activities,
    };
  };

export const recentActivity =
  async () => {
    return await Activity.find()
      .sort({
        createdAt: -1,
      })
      .limit(10);
  };