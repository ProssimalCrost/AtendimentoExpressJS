"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.atendimentos = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.atendimentos = (0, pg_core_1.pgTable)("atendimentos", {
    id: (0, pg_core_1.uuid)("id").primaryKey(),
    tipo: (0, pg_core_1.integer)("tipo").notNull(),
    status: (0, pg_core_1.varchar)("status", { length: 20 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
//# sourceMappingURL=schema.js.map