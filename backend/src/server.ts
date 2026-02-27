import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import { router } from "./routes/atendimentos.js";

const app = express();
const httpServer = http.createServer(app);

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
const server = http.createServer(app);

app.use("/atendimentos", router); /*Ao usar "/atendimentos, router" as rotas em router devem conter apenas "/" */ 

const PORT = process.env.PORT || 3333;
const NODE_ENV = process.env.NODE_ENV || "development";
const FRONTEND_URL = process.env.FRONTEND_URL;

// =======================
// 🔐 CORS INTELIGENTE
// =======================

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3333",
  FRONTEND_URL,
];

const corsOptions = {
  origin: (origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void) => {
    // Permite requests sem origin (Postman etc)
    if (!origin) return callback(null, true);

    // Permite localhost
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Permite qualquer deploy preview do Vercel
    if (/\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }

    return callback(new Error("❌ CORS bloqueado"));
  },
  methods: ["GET", "POST", "PATCH", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ========================
// 📡 ROTAS
// =======================

app.use("/atendimentos", router);

// =======================
// 🚀 START SERVER
// =======================

httpServer.listen(PORT, () => {
  console.log("=================================");
  console.log(` Ambiente: ${NODE_ENV}`);
  console.log(` Porta: ${PORT}`);
  console.log(` Frontend URL: ${FRONTEND_URL}`);
  console.log(`teste:${process.env.TESTE}`);
  console.log("=================================");
});