import { Router } from "express";
import {
  createOccurrence,
  getOccurrences,
  getOcurrencesByUser,
  deleteOccurrence,
} from "../controllers/occurrenceController.js";

export const occurrenceRouter = Router();

occurrenceRouter.get("/", getOccurrences);
occurrenceRouter.post("/", createOccurrence);
occurrenceRouter.get("/users/:id", getOcurrencesByUser);
occurrenceRouter.delete("/:id", deleteOccurrence);
