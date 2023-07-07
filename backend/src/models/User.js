import mongoose from "mongoose";
import Counter from "./Counter.js";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 125,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 125,
    },
    password: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 125,
    },
  },
  { versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    const counter = await Counter.findByIdAndUpdate(
      "userIdCounter",
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    this._id = counter.sequence_value;
    next();
  } catch (error) {
    next(error);
  }
});

const Usuario = mongoose.model("Usuario", userSchema);

export default Usuario;
