// backend/drizzle/schema.ts
import { pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";

export const attendimentos = pgTable("atendimentos", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: varchar("description", { length: 255 }),
  status: varchar("status", { length: 20 }).default("pending"),
 
});

// npx drizzle-kit studio command to open the visual editor
