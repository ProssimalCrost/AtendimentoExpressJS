import "dotenv/config";
import { Pool } from "pg";
import * as schema from "./schema.js";
export declare const database: import("drizzle-orm/node-postgres").NodePgDatabase<typeof schema> & {
    $client: Pool;
};
//# sourceMappingURL=drizzle.d.ts.map