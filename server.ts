import express from "express";
import {router} from "./routes/atendimentos.ts";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/atendimentos", router);

app.listen(3000, () => {
    console.log("Servidor rodando");
})

app.post("/test", (req, res ) => {
    res.send("Teste Ok");
})
