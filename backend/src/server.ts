import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import { Server as IOServer } from "socket.io";
import { router } from "./routes/atendimentos.js";

const app = express();

/* =========================
   🔑 CORS EXPRESS (PRIMEIRO)
========================= */
const FRONTEND_URL = "https://atendimento-express.vercel.app";

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// responde o preflight
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
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
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
