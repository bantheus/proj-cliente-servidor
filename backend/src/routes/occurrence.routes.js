import { Router } from "express";
import {
  createOccurrence,
  getOccurrences,
} from "../controllers/occurrenceController.js";

export const occurrenceRouter = Router();

occurrenceRouter.get("/", getOccurrences);
occurrenceRouter.post("/", createOccurrence);
