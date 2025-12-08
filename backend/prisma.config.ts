// prisma.config.ts

import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  // CORREÇÃO: Usamos 'datasource' com a chave 'url', 
  // que é o que a função 'defineConfig' espera.
  datasource: {
    url: env("DATABASE_URL"),
  },
});