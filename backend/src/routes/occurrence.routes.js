import { Router } from "express";
import { getOccurrences } from "../controllers/occurrenceController.js";

export const occurrenceRouter = Router();

occurrenceRouter.get("/", getOccurrences);
