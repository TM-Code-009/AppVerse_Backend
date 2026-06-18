import {
  Request,
  Response,
} from "express";

import * as SuggestionService
from "./suggestion.service";

import * as ActivityService
from "../activity/activity.service";
import { sendEmail } from "../../utils/sendEmail";

export const create =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const suggestion =
        await SuggestionService.createSuggestion(
          req.body
        );

        await sendEmail(
  "New Suggestion Received",

  `
  <h2>New Suggestion</h2>

  <p><strong>Name:</strong>
  ${suggestion.name}</p>

  <p><strong>Email:</strong>
  ${suggestion.email}</p>

  <p><strong>Suggestion:</strong>
  ${suggestion.suggestion}</p>
  `
);

      await ActivityService.createActivity(
        "NEW_SUGGESTION",
        `Suggestion received from ${suggestion.name}`
      );

      res.status(201).json({
        success: true,
        data: suggestion,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  };

export const getAll =
  async (
    req: Request,
    res: Response
  ) => {
    const suggestions =
      await SuggestionService.getSuggestions();

    res.json({
      success: true,
      data: suggestions,
    });
  };

  export const remove =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const suggestion =
        await SuggestionService.deleteSuggestion(
          String(req.params.id)
        );

      if (!suggestion) {
        return res.status(404).json({
          success: false,
          message:
            "Suggestion not found",
        });
      }

      res.json({
        success: true,
        message:
          "Suggestion deleted",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
      });
    }
  };