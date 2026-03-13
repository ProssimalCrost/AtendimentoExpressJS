CREATE TABLE "atendimentos" (
  id: uuid("id").primaryKey(),
  tipo: integer("tipo").notNull(),
  status: varchar("status", { length: 20 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
);
