import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
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
});

userSchema.statics.signup = async function (nome, email, senha) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Este email já está sendo utilizado!");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(senha, salt);

  const user = await this.create({ nome, email, senha: hash });

  return user;
};

export default mongoose.model("Usuario", userSchema);
