import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema"; 


const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL não está definida")
  }

  console.log("DATABASE_URL:", process.env.DATABASE_URL);

export const database = drizzle(pool, { schema });


// npx drizzle-kit studio command to open the visual editor

// é necessario import "dotenv/config" 
// no topo deste arquivo para funcionar a variavel de ambiente .env