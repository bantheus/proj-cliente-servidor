import Occurrence from "../models/Occurrence.js";
import InvalidToken from "../models/invalidToken.js";
import Usuario from "../models/User.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const getOccurrences = async (req, res) => {
  try {
    const data = await Occurrence.find({}).populate("user_id", "name");
    if (data.length > 0) {
      const occurrences = data.map((occurrence) => ({
        id: occurrence._id,
        registered_at: occurrence.registered_at,
        local: occurrence.local,
        occurrence_type: occurrence.occurrence_type,
        km: occurrence.km,
        token: occurrence.token,
        user_id: occurrence.user_id.name,
      }));
      res.status(200).json(occurrences);
    } else {
      res
        .status(200)
        .json({ message: "Nenhuma ocorrência encontrada", occurrences: [] });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

export const getOcurrencesByUser = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization;

    console.log(`Id -> ${id} | Token -> ${token}`);

    if (!token) {
      return res.status(401).json({ message: "Token não informado!" });
    }

    const existingToken = await InvalidToken.findOne({ token });

    if (existingToken) {
      return res.status(401).json({ message: "Token inválido" });
    }

    const user = await Usuario.findOne({ _id: id });
    console.log(`User-> ${user}`);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const data = await Occurrence.find()
      .where("user_id")
      .equals({ _id: id })
      .populate("user_id", "name");

    if (data.length > 0) {
      const occurrences = data.map((occurrence) => ({
        id: occurrence._id,
        registered_at: occurrence.registered_at,
        local: occurrence.local,
        occurrence_type: occurrence.occurrence_type,
        km: occurrence.km,
        token: occurrence.token,
        user_id: occurrence.user_id.name,
      }));
      res.status(200).json(occurrences);
    } else {
      res
        .status(200)
        .json({ message: "Nenhuma ocorrência encontrada", occurrences: [] });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

export const createOccurrence = async (req, res) => {
  try {
    const { registered_at, local, occurrence_type, km, user_id } = req.body;
    const token = req.headers.authorization;

    console.log(
      `Registered At -> ${registered_at} | Local -> ${local} | Occurrence Type -> ${occurrence_type} | Km -> ${km} | User Id -> ${user_id} | Token -> ${token}`
    );

    if (occurrence_type <= 0 || occurrence_type > 10) {
      return res.status(400).json({ message: "Tipo de ocorrência inválida" });
    }

    if (!token) {
      return res.status(401).json({ message: "Token não informado!" });
    }

    const existingToken = await InvalidToken.findOne({ token });

    if (existingToken) {
      return res.status(401).json({ message: "Token inválido" });
    }

    const user = await Usuario.findOne({ _id: user_id });
    console.log(`User-> ${user}`);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (!registered_at || !local || !occurrence_type || !km || !user_id) {
      return res
        .status(400)
        .json({ message: "Todos os campos devem ser preenchidos!" });
    }

    const currentDate = new Date();
    const occurrenceDate = new Date(registered_at);

    if (occurrenceDate > currentDate) {
      return res.status(400).json({
        message: "A data de ocorrência não pode ser superior à data atual!",
      });
    }

    const occurrence = await Occurrence.create({
      registered_at,
      local,
      occurrence_type,
      km,
      token,
      user_id,
    });

    return res.status(201).json({
      id: occurrence._id,
      registered_at: occurrence.registered_at,
      local: occurrence.local,
      occurrence_type: occurrence.occurrence_type,
      km: occurrence.km,
      token: token,
      user_id: occurrence.user_id,
    });
  } catch (erro) {
    console.error(erro.message);
    return res.status(500).json({ message: "Erro no servidor!" });
  }
};

//Delete
export const deleteOccurrence = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization;

    const splitToken = token.split("Bearer ")[1];

    console.log(`Id -> ${id} | Token -> ${token}`);

    if (!token) {
      return res.status(401).json({ message: "Token não informado!" });
    }

    const existingToken = await InvalidToken.findOne({ token });

    if (existingToken) {
      return res.status(401).json({ message: "Token inválido" });
    }

    const occurrence = await Occurrence.findOne({ _id: id });
    console.log(`Ocorrencia -> ${occurrence}`);

    if (!occurrence) {
      return res.status(404).json({ message: "Ocorrência não encontrada" });
    }

    const decodedToken = jwt.verify(splitToken, process.env.SECRET);
    const tokenId = decodedToken._id;

    console.log(`TokenId -> ${tokenId}`);

    if (tokenId != occurrence.user_id) {
      return res.status(401).json({
        message: "Ocorrencia não pode ser deletada por esse usuário!",
      });
    }

    await Occurrence.findByIdAndRemove({ _id: id });

    res.status(200).json({ message: "Ocorrência deletada com sucesso" });
  } catch (erro) {
    return res.status(500).json({ message: "Erro no servidor!" });
  }
};

//Update
export const updateOccurrence = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization;

    const splitToken = token.split("Bearer ")[1];
    const { registered_at, local, occurrence_type, km, user_id } = req.body;

    console.log(`Ocorrencia ID -> ${id} | Token -> ${token}`);

    if (!token) {
      return res.status(401).json({ message: "Token não informado!" });
    }

    const existingToken = await InvalidToken.findOne({ token });

    if (existingToken) {
      return res.status(401).json({ message: "Token inválido" });
    }

    const user = await Usuario.findOne({ _id: user_id });
    console.log(`User-> ${user}`);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const occurrence = await Occurrence.findOne({ _id: id });
    console.log(`Ocorrencia -> ${occurrence}`);

    if (!occurrence) {
      return res.status(404).json({ message: "Ocorrência não encontrada" });
    }

    if (!registered_at || !local || !occurrence_type || !km || !user_id) {
      return res
        .status(400)
        .json({ message: "Todos os campos devem ser preenchidos!" });
    }

    const currentDate = new Date();
    const occurrenceDate = new Date(registered_at);

    if (occurrenceDate > currentDate) {
      return res.status(400).json({
        message: "A data de ocorrência não pode ser superior à data atual!",
      });
    }

    if (user._id != occurrence.user_id) {
      return res.status(401).json({
        message: "Ocorrencia não pode ser alterada por esse usuário!",
      });
    }

    const updatedData = {
      registered_at,
      local,
      occurrence_type,
      km,
      token,
      user_id,
    };

    await Occurrence.findByIdAndUpdate({ _id: id }, updatedData);

    return res.status(201).json({
      id: occurrence._id,
      registered_at: occurrence.registered_at,
      local: occurrence.local,
      occurrence_type: occurrence.occurrence_type,
      km: occurrence.km,
      token: token,
      user_id: occurrence.user_id,
    });
  } catch (erro) {
    return res.status(500).json({ message: "Erro no servidor!" });
  }
};
