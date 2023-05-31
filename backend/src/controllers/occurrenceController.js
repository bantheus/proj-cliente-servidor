import Occurrence from "../models/Occurrence.js";
import InvalidToken from "../models/invalidToken.js";
import Usuario from "../models/User.js";

export const getOccurrences = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const occurrence = await Occurrence.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      occurrence: occurrence.id,
      registered_at: occurrence.registered_at,
      local: occurrence.local,
      occurrence_type: occurrence.occurrence_type,
      km: occurrence.km,
      token: token,
      user_id: occurrence.user_id,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
};

export const createOccurrence = async (req, res) => {
  try {
    const { registered_at, local, occurrence_type, km, user_id } = req.body;
    const token = req.headers.authorization;

    console.log(
      `Registered At -> ${registered_at} | Local -> ${local} | Occurrence Type -> ${occurrence_type} | Km -> ${km} | User Id -> ${user_id}`
    );

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

    const occurrence = await Occurrence.create({
      registered_at,
      local,
      occurrence_type,
      km,
      user_id,
    });

    return res.status(201).json({
      occurrence: occurrence.id,
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
