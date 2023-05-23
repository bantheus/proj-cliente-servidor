import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  sequence_value: {
    type: Number,
    default: 1,
  },
});

const Counter = mongoose.model("Counter", counterSchema);

const userSchema = new mongoose.Schema({
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
});

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
