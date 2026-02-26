"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_js_1 = require("../database/drizzle.js");
const schema_js_1 = require("../database/schema.js");
const drizzle_orm_1 = require("drizzle-orm");
const crypto_1 = __importDefault(require("crypto"));
class AtendimentoService {
    async create(data) {
        const id = crypto_1.default.randomUUID();
        await drizzle_js_1.database
            .insert(schema_js_1.atendimentos)
            .values({
            id,
            name: data.name,
            description: data.description,
            status: "pending",
        });
        return {
            message: "Atendimento criado com sucesso",
            id,
        };
    }
    async list(limit = 50) {
        const rows = await drizzle_js_1.database
            .select()
            .from(schema_js_1.atendimentos)
            .orderBy((0, drizzle_orm_1.asc)(schema_js_1.atendimentos.created_at))
            .limit(limit);
        return rows;
    }
    async finish(id) {
        await drizzle_js_1.database
            .update(schema_js_1.atendimentos)
            .set({ status: "finished" })
            .where((0, drizzle_orm_1.eq)(schema_js_1.atendimentos.id, id));
        return {
            message: `Atendimento ${id} finalizado com sucesso`,
        };
    }
}
exports.default = new AtendimentoService();
//# sourceMappingURL=services.js.map