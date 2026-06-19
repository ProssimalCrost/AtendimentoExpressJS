import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import { router } from "./routes/atendimentos.js";

const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";
const FRONTEND_URL = process.env.FRONTEND_URL;

// Permite localhost, IPs da rede local e Vercel
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://10.0.0.189:3000",
  FRONTEND_URL,
  "https://atendimento-express.vercel.app",
].filter(Boolean);

const isLocalNetwork = (origin: string) => {
  return /^http:\/\/(localhost|127\.0\.0\.1|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+)(:\d+)?$/.test(origin);
};

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    if (isLocalNetwork(origin)) {
      return callback(null, true);
    }

    if (/\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS bloqueado para origem: ${origin}`));
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use(express.json({ type: "*/*" }));
app.use(express.urlencoded({ extended: true }));

app.use("/atendimentos", router);

httpServer.listen(Number(PORT), "0.0.0.0", () => {
  console.log("=================================");
  console.log(`Ambiente: ${NODE_ENV}`);
  console.log(`API rodando em: http://0.0.0.0:${PORT}`);
  console.log(`Frontend URL: ${FRONTEND_URL}`);
  console.log("=================================");
});