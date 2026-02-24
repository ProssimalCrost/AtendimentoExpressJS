"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.atendimentos = void 0;
// backend/drizzle/schema
const pg_core_1 = require("drizzle-orm/pg-core");
exports.atendimentos = (0, pg_core_1.pgTable)("atendimentos", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)("name", { length: 100 }).notNull(),
    description: (0, pg_core_1.varchar)("description", { length: 255 }),
    status: (0, pg_core_1.varchar)("status", { length: 20 }).default("pending"),
    created_at: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
});
// npx drizzle-kit studio command to open the visual editor
// status: varchar("status", { length: 20 }).default("pending"),
// created_at: timestamp("created_at").defaultNow().notNull(), 
//# sourceMappingURL=schema.js.map