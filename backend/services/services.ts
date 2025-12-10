// server.ts ou server.js (com "type": "module" no package.json)

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {db} from "../database/drizzle"
import { attendimentos } from "../drizzle/schema";

interface Attendimento {
    id: string;
    name: string;
    description: string | null;
    status: "pending" | "finished";
    created_at: Date;
}


class AttendimentoService {
    // Criar atendimento
    async create(data: Attendimento) {
        // Logica para criar atendimento
        const id = crypto.randomUUID();
        const [newAttendimento] = await db.insert(attendimentos).values({
          id,
          name: data.name,
          description: data.description,
          status: "pending",
          createdAt: data.created_at
        }).returning();

      return {
        message: "Atendimento criado com sucesso",
        attendimento: newAttendimento
};
};

    async list() {
    // Logica para listar atendiemntos
    const rows = await db
    .select()
    .from(attendimentos)
    .orderBy(attendimentos.createdAt);

    return {attendimentos: rows}
};

    async finish(id: string) {
        // Logica para finalizar atendimento
        return { message: `Atendimento ${id} finalizado com sucesso` }
}
};

export default new AttendimentoService();