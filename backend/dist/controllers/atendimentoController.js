"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_js_1 = __importDefault(require("../services/services.js"));
class AttendimentoController {
    // Criar atendimento
    async create(req, res) {
        const { name, description, status } = req.body ?? {};
        console.log("REQ BODY REAL:", req.body);
        console.log("➡️ POST /atendimentos recebido", req.body);
        // 1. validação
        if (!name || name.trim() === "") {
            return res.status(400).json({ error: "O nome é obrigatório." });
        }
        // 2. a requisição, deve bater com create do service
        const result = await services_js_1.default.create({
            name: name.trim(),
            description: description?.trim() || null,
            status: status?.trim() === "finished" ? "pending" : "finished",
        });
        // 3. responder ao cliente
        return res.status(201).json(result);
    }
    async list(req, res) {
        //const limit = Number(req.query.limit) || 50;
        const atendimentos = await services_js_1.default.list;
        const result = await services_js_1.default.list();
        return res.status(200).json(atendimentos);
    }
    ;
    async finish(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID é obrigatório." });
        }
        const result = await services_js_1.default.finish(id);
        return res.status(200).json(result);
    }
    ;
}
;
exports.default = new AttendimentoController();
//# sourceMappingURL=atendimentoController.js.map