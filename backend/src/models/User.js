import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
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

export default mongoose.model("Usuario", userSchema);
