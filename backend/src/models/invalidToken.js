import mongoose from "mongoose";

const InvalidTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expirationDate: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
  },
  { versionKey: false }
);

const InvalidToken = mongoose.model("InvalidToken", InvalidTokenSchema);

export default InvalidToken;
