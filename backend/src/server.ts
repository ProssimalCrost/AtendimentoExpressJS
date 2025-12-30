import "dotenv/config";
import express from "express";
import {router} from "./routes/atendimentos.js";
import cors from "cors";
import http from "http";
import {Server as IOServer} from "socket.io"


const app = express();
app.use(cors({
    origin: [
        "https://localhost:3000",
        "https://atendimentoexpress-1kz00063s-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/atendimentos", router); /*Ao usar "/atendimentos, router" as rotas em router devem conter apenas "/" */ 

/* Comando para iniciar o srvidor: node --run dev http://localhost:3000/atendimentos */ 
const httpServer = http.createServer(app);
const io = new IOServer(httpServer, {
    cors: {
        origin: [
            "https://localhost:3000",
            "https://atendimentoexpress-1kz00063s-projects.vercel.app",
         ],
    methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);
});

export {io};

const PORT = process.env.PORT || 3333;

httpServer.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// é necessario import "dotenv/config" 
// no topo deste arquivo para funcionar a variavel de ambiente .env