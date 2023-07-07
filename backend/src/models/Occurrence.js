import mongoose from "mongoose";
import Counter from "./Counter.js";

const occurrenceSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      unique: true,
    },
    registered_at: {
      type: String,
      required: true,
    },
    local: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 125,
    },
    occurrence_type: {
      type: Number,
      required: true,
      minlength: 1,
    },
    km: {
      type: Number,
      required: true,
      minlength: 1,
      maxlength: 9999,
    },
    token: {
      type: String,
    },
    user_id: {
      type: Number,
      ref: "Usuario",
      required: true,
    },
  },
  { versionKey: false }
);

occurrenceSchema.pre("save", async function (next) {
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

const Occurrence = mongoose.model("Occurrence", occurrenceSchema);

export default Occurrence;
