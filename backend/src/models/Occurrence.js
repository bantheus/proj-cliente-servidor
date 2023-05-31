import mongoose, { Schema } from "mongoose";
import Counter from "./Counter.js";

const occurenceSchema = new mongoose.Schema({
  _id: {
    type: Number,
    unique: true,
  },
  registered_at: {
    type: Date,
    required: true,
  },
  local: {
    type: String,
    required: true,
  },
  occurence_type: {
    type: Number,
    required: true,
  },
  km: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

occurenceSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    const counter = await Counter.findByIdAndUpdate(
      "occurrenceIdCounter",
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    this._id = counter.sequence_value;
    next();
  } catch (error) {
    next(error);
  }
});

const Occurrence = mongoose.model("Occurrence", occurenceSchema);

export default Occurrence;
