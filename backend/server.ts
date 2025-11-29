import express from "express";
import {router} from "./routes/atendimentos.ts";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/atendimentos", router);

/* Comando para iniciar o srvidor: node --run dev */ 

app.listen(5000, () => {
    console.log("Servidor rodando");
})


