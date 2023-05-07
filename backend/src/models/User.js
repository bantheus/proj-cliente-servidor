import { model, Schema } from "mongoose";

export const Usuario = model(
  "Usuario",
  new Schema(
    {
      nome: {
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
      senha: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 125,
      },
    },
    { timestamps: true }
  )
);
