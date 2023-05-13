import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user.routes.js";
import { conectaDb } from "./database/db.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/users", userRouter);

conectaDb()
  .then(() => {
    const porta = process.env.PORT;
    const host = process.env.SERVER_HOST;

    app.listen(porta, () => {
      console.log(`🟢 Servidor rodando em http://${host}:${porta}`);
    });
  })
  .catch((erro) => {
    console.error(erro);
    console.error("🔴 Erro ao conectar-se ao servidor!");
  });
