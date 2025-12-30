import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import { Server as IOServer } from "socket.io";
import { router } from "./routes/atendimentos.js";

const app = express();

/* =========================
   🔑 CORS GLOBAL (ABERTO)
========================= */
app.use(cors());
app.options("*", cors());

/* =========================
   🔑 MIDDLEWARES
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   🔑 ROTAS
========================= */
app.use("/atendimentos", router);

/* =========================
   🔑 HTTP + SOCKET
========================= */
const httpServer = http.createServer(app);

const io = new IOServer(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH"],
  },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);
});

export { io };

/* =========================
   🔑 SERVER
========================= */
const PORT = process.env.PORT || 3333;

httpServer.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
