import { pgTable, uuid, integer, varchar, timestamp } from "drizzle-orm/pg-core";

export const atendimentos = pgTable("atendimentos", {
  id: uuid("id").primaryKey(),
  tipo: integer("tipo").notNull(),
  status: varchar("status", { length: 20 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});


