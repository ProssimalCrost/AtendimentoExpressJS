import { pgTable, uuid, integer, varchar, timestamp } from "drizzle-orm/pg-core";

export const atendimentos = pgTable("atendimentos", {
  id: uuid("id").primaryKey(),
  tipo: integer("tipo").notNull(),
  status: varchar("status", { length: 20 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/*export const atendimentos = pgTable("atendimentos", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	description: varchar({ length: 255 }),
	status: varchar({ length: 20 }).default('pending'),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});*/
