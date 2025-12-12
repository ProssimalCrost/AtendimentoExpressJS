// server.ts ou server.js (com "type": "module" no package.json)

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { database } from "../database/drizzle.ts";
import crypto from "crypto";
import { attendimentos } from "../database/schema.ts";

interface Attendimento {
    id: string;
    name: string;
    description: string | null;
    status: "pending" | "finished";
   // created_at: Date;
}

console.log("SERVICE CARREGADO DE:", __filename);


class AttendimentoService {
    // Criar atendimento
    async create(data: Attendimento) {
        // Logica para criar atendimento
        const id = crypto.randomUUID();
        const [newAttendimento] = await database.insert(attendimentos).values({
          id,
          name: data.name,
          description: data.description,
          status: "pending",
        // created_at: data.created_at
        }).returning();

        console.log(newAttendimento)

      return {
        message: "Atendimento criado com sucesso",
        attendimento: newAttendimento
};
   
};

    async list() {
    // Logica para listar atendiemntos
  /*  const rows = await database
    .select()
    .from(attendimentos)
    .orderBy(attendimentos.created_at); 

    return {attendimentos: rows} */
}; 

    async finish(id: string) {
        // Logica para finalizar atendimento
        return { message: `Atendimento ${id} finalizado com sucesso` }
}
};

export default new AttendimentoService();