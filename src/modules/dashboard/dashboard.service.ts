import App from "../apps/app.model";
import Suggestion from "../suggestion/suggestion.model";
import Hire from "../hire/hire.model";
  import Activity
from "../activity/activity.model";

export const getStats =
  async () => {
    const apps =
      await App.countDocuments();

    const featuredApps =
      await App.countDocuments({
        featured: true,
      });

    const suggestions =
      await Suggestion.countDocuments();

    const hireRequests =
      await Hire.countDocuments();

    return {
      apps,
      featuredApps,
      suggestions,
      hireRequests,
    };
  };



export const recentActivity =
  async () => {
    return Activity.find()
      .sort({
        createdAt: -1,
      })
      .limit(10);
  };