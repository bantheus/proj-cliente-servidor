import Usuario from "../models/User.js";
import InvalidToken from "../models/invalidToken.js";
// import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import validator from "validator";

dotenv.config();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`Email -> ${email} | Password -> ${password}`);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos devem ser preenchidos!" });
    }

    const user = await Usuario.findOne({ email });
    console.log(`User -> ${user}`);

    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas!" });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Credenciais inválidas!" });
    }

    const token = createToken(user._id);

    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (erro) {
    console.error(erro.message);
    return res.status(500).json({ message: "Erro no servidor!" });
  }
};

// Signup
export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log(
      `Name -> ${name} | Email -> ${email} | Password -> ${password}`
    );

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos devem ser preenchidos!" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email inválido!" });
    }

    const exists = await Usuario.findOne({ email });

    if (exists) {
      return res
        .status(422)
        .json({ message: "Este email já está sendo utilizado!" });
    }

    if (password.trim().length < 2) {
      return res
        .status(400)
        .json({ message: "A senha não é forte o suficiente!" });
    }

    if (!password.trim()) {
      return res.status(400).json({ message: "A senha é obrigatória!" });
    }

    const user = await Usuario.create({
      name,
      email,
      password,
    });

    return res
      .status(201)
      .json({ id: user._id, name: user.name, email: user.email });
  } catch (erro) {
    console.error(erro.message);
    return res.status(500).json({ message: "Erro no servidor!" });
  }
};

// Logout
export const logoutUser = async (req, res) => {
  try {
    const id = req.body.id;
    const token = req.headers.authorization;

    console.log(`Id-> ${id} | Token -> ${token}`);

    const user = await Usuario.findOne({ _id: id });
    console.log(`User-> ${user}`);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const existingToken = await InvalidToken.findOne({ token });

    if (existingToken) {
      return res.status(401).json({ message: "Token inválido" });
    }

    await InvalidToken.create({
      token,
      expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return res.status(200).json({ message: "Logout realizado com sucesso!" });
  } catch (erro) {
    return res.status(500).json({ message: "Erro no servidor!" });
  }
};

// Get All
export const getUsers = async (req, res) => {
  const usuarios = await Usuario.find({}).sort({ createdAt: -1 });

  res.status(200).json(usuarios);
};

// // Get One
// export const getUser = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ erro: "Nenhum usuário encontrado!" });
//   }

//   const usuario = await Usuario.findById(id);

//   if (!usuario) {
//     return res.status(400).json({ erro: "Nenhum usuário encontrado!" });
//   }

//   res.status(200).json({ msg: "Usuário encontrado com sucesso" });
// };

// // Delete
// export const deleteUser = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ erro: "Nenhum usuário encontrado!" });
//   }

//   const usuario = await Usuario.findOneAndDelete({ _id: id });

//   if (!usuario) {
//     return res.status(400).json({ erro: "Nenhum usuário encontrado!" });
//   }

//   res.status(200).json({ msg: "Usuário deletado com sucesso" });
// };

//Update;
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password } = req.body;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Token não informado!" });
    }

    const existingToken = await InvalidToken.findOne({ token });

    if (existingToken) {
      return res.status(401).json({ message: "Token inválido" });
    }

    const user = await Usuario.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (email !== user.email) {
      const exists = await Usuario.findOne({ email });

      if (exists) {
        return res
          .status(422)
          .json({ message: "Este email já está sendo utilizado!" });
      }
    }

    if (password.trim()) {
      if (password.trim().length < 2) {
        return res
          .status(400)
          .json({ message: "A senha não é forte o suficiente!" });
      }
    }

    if (!password.trim()) {
      await Usuario.findOneAndUpdate({ _id: id }, { name, email });
    } else {
      await Usuario.findOneAndUpdate({ _id: id }, { name, email, password });
    }

    return res
      .status(200)
      .json({ id: user._id, name: user.name, email: user.email });
  } catch (erro) {
    console.log(erro);
    return res.status(500).json({ message: "Erro no servidor!" });
  }
};
