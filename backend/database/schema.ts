// backend/drizzle/schema.ts
import { pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";

export const atendimentos = pgTable("atendimentos", {

  name: varchar("name", { length: 150 }).notNull(),
  description: varchar("description", { length: 300 }),

});


// npx drizzle-kit studio command to open the visual editor


 // status: varchar("status", { length: 20 }).default("pending"),
 // created_at: timestamp("created_at").defaultNow().notNull(), 
