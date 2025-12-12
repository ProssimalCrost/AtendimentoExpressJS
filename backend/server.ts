import express from "express";
import {router} from "./routes/atendimentos.ts";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/atendimentos", router); /*Ao usar "/atendimentos, router" as rotas em router devem conter apenas "/" */ 

/* Comando para iniciar o srvidor: node --run dev http://localhost:3000/atendimentos */ 

app.listen(3000, () => {
    console.log("Servidor rodando");
})

