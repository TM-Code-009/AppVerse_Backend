
import Suggestion
from "./suggestion.model";

export const createSuggestion =
  async (data: any) => {
    return Suggestion.create(data);
  };

export const getSuggestions =
  async () => {
    return Suggestion.find()
      .sort({
        createdAt: -1,
      });
  };

export const deleteSuggestion =
  async (id: string) => {
    return Suggestion.findByIdAndDelete(
      id
    );
  };

