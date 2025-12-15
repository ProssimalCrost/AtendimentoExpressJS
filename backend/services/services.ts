// server.ts ou server.js (com "type": "module" no package.json)

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { database } from "../database/drizzle.ts";
import crypto from "crypto";
import { attendimentos } from "../database/schema.ts";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("CONTROLLER CARREGADO DE:", __filename);


interface Attendimento {
  //  id: string;
    name: string;
    description: string | null;
 //   status: "pending" | "finished";
    
}


class AttendimentoService {
    // Criar atendimento
    async create(data: Attendimento) {
        // Logica para criar atendimento
        const id = crypto.randomUUID();
        const [newAttendimento] = await database.insert(attendimentos).values({
       //   id,
          name: data.name,
          description: data.description,
       //   status: "pending",
          
        }).returning();

        console.log(newAttendimento)

      return {
        message: "Atendimento criado com sucesso",
        attendimento: newAttendimento
};
   
};

    async list() {
    // Logica para listar atendiemntos
    const rows = await database
    .select()
    .from(attendimentos)
  //  .orderBy(attendimentos.created_at); 

    return {attendimentos: rows} 
}; 

    async finish(id: string) {
        // Logica para finalizar atendimento
        return { message: `Atendimento ${id} finalizado com sucesso` }
}
};

export default new AttendimentoService();