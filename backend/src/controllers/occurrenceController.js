import Occurrence from "../models/Occurrence.js";

export const getOccurrences = async (req, res) => {
  const occurrence = await Occurrence.find({}).sort({ createdAt: -1 });

  res.status(200).json(occurrence);
};
