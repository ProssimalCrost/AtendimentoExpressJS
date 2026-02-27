"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const atendimentos_js_1 = require("./routes/atendimentos.js");
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
app.use(express_1.default.json({ type: "*/*" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://atendimento-express.vercel.app",
    ],
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
    credentials: true,
}));
/* Comando para iniciar o srvidor: node --run dev http://localhost:3000/atendimentos */
const server = http_1.default.createServer(app);
app.use("/atendimentos", atendimentos_js_1.router); /*Ao usar "/atendimentos, router" as rotas em router devem conter apenas "/" */
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
    origin: (origin, callback) => {
        // Permite requests sem origin (Postman etc)
        if (!origin)
            return callback(null, true);
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
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// ========================
// 📡 ROTAS
// =======================
app.use("/atendimentos", atendimentos_js_1.router);
// =======================
// 🚀 START SERVER
// =======================
httpServer.listen(PORT, () => {
    console.log("=================================");
    console.log(` Ambiente: ${NODE_ENV}`);
    console.log(` Porta: ${PORT}`);
    console.log(` Frontend URL: ${FRONTEND_URL}`);
    console.log("=================================");
});
//# sourceMappingURL=server.js.map