import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

export const conectaDb = async () => {
  try {
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const pass = process.env.DB_PASSWORD;

    await mongoose.connect(`mongodb://${user}:${pass}@${host}:27017`);
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (erro) {
    console.error(erro);
    setTimeout(conectaDb, 5000);
  }
};
