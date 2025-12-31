import "dotenv/config";
import express from "express";
import {router} from "./routes/atendimentos.js";
import cors from "cors";
import http from "http";
import {Server as IOServer} from "socket.io"

const app = express();

app.use(express.json({ type: "*/*" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://atendimento-express.vercel.app",
    ],
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
    credentials: true,
}));

/* Comando para iniciar o srvidor: node --run dev http://localhost:3000/atendimentos */ 
const httpServer = http.createServer(app);
const io = new IOServer(httpServer, {
    cors: {
        origin: [
            "http://localhost:3000",
            "https://atendimento-express.vercel.app"
        ],
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
    }
});


io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);
});

export {io};

app.use("/atendimentos", router); /*Ao usar "/atendimentos, router" as rotas em router devem conter apenas "/" */ 

const PORT = process.env.PORT || 3333;

httpServer.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// é necessario import "dotenv/config" 
// no topo deste arquivo para funcionar a variavel de ambiente .env