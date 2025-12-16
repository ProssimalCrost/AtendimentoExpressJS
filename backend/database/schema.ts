// backend/drizzle/schema.ts
import { pgTable, varchar, timestamp, uuid } from "drizzle-orm/pg-core";

export const atendimentos = pgTable("atendimentos", {
  id: uuid("id").primaryKey().defaultRandom(),
  
  name: varchar("name", { length: 100 }).notNull(),

  description: varchar("description", { length: 255 }),

  status: varchar("status", { length: 20 }).default("pending"),

  created_at: timestamp("created_at").defaultNow(),

});


// npx drizzle-kit studio command to open the visual editor


 // status: varchar("status", { length: 20 }).default("pending"),
 // created_at: timestamp("created_at").defaultNow().notNull(), 
