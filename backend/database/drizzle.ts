import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema.ts"; 

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export const database = drizzle(pool, { schema });


// npx drizzle-kit studio command to open the visual editor