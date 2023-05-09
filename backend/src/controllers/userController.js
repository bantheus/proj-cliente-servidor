import Usuario from "../models/User.js";
import mongoose from "mongoose";

// Login
export const loginUser = async (req, res) => {
  res.json({ msg: "Login User" });
};

// Signup
export const signupUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const user = await Usuario.signup(nome, email, senha);

    res.status(200).json({ email, user });
  } catch (erro) {
    res.status(400).json({ error: erro.message });
  }
};

// Get All
export const getUsers = async (req, res) => {
  const usuarios = await Usuario.find({}).sort({ createdAt: -1 });

  res.status(200).json(usuarios);
};

// Get One
export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ erro: "Nenhum usuário encontrado!" });
  }

  const usuario = await Usuario.findById(id);

  if (!usuario) {
    return res.status(400).json({ erro: "Nenhum usuário encontrado!" });
  }

  res.status(200).json({ msg: "Usuário encontrado com sucesso" });
};

// Delete
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ erro: "Nenhum usuário encontrado!" });
  }

  const usuario = await Usuario.findOneAndDelete({ _id: id });

  if (!usuario) {
    return res.status(400).json({ erro: "Nenhum usuário encontrado!" });
  }

  res.status(200).json({ msg: "Usuário deletado com sucesso" });
};

// Update
export const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ erro: "Nenhum usuário encontrado!" });
  }

  const usuario = await Usuario.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!usuario) {
    return res.status(400).json({ erro: "Nenhum usuário encontrado!" });
  }

  res.status(200).json({ msg: "Usuário alterado com sucesso" });
};
