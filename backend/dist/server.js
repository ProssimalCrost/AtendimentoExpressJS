"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const atendimentos_js_1 = require("./routes/atendimentos.js");
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
// é necessario import "dotenv/config" 
// no topo deste arquivo para funcionar a variavel de ambiente .env
const app = (0, express_1.default)();
app.use(express_1.default.json({ type: "*/*" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3333",
        "http://localhost:3000",
        "https://atendimento-express.vercel.app",
    ],
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
    credentials: true,
}));
/* Comando para iniciar o servidor: node --run dev http://localhost:3333/atendimentos */
const httpServer = http_1.default.createServer(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: [
            "http://localhost:3333",
            "http://localhost:3000",
            "https://atendimento-express.vercel.app"
        ],
        methods: ["GET", "POST", "PATCH", "OPTIONS"],
    }
});
exports.io = io;
io.on("connection", (socket) => {
    console.log("✅ Cliente conectado:", socket.id);
});
io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);
});
app.use("/atendimentos", atendimentos_js_1.router); /*Ao usar "/atendimentos, router" as rotas em router devem conter apenas "/" */
const PORT = process.env.PORT || 3333;
httpServer.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}/atendimentos`);
});
//# sourceMappingURL=server.js.map