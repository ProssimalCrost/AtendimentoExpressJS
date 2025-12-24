import { database } from "../database/drizzle.ts";
import { atendimentos } from "../database/schema.ts";
import { asc } from "drizzle-orm";
import crypto from "crypto";
import { io } from "../server.ts"
import { eq } from "drizzle-orm"

/**A
 * Dados que vêm do controller
 */
interface CreateAtendimentoDTO {
  name: string;
  description: string | null;
  status: "pending" | "finished"
}

class AtendimentoService {
  /* CREATE — POST /atendimentos */
  async create(data: CreateAtendimentoDTO) {
      const id = crypto.randomUUID();
    // INSERT no banco (sem returning)
    await database
      .insert(atendimentos)
      .values({
        name: data.name,
        description: data.description,
        status: "pending"
      });

      io.emit("attendance:new", {
        id,
        name: data.name,
        description: data.description,
        status: "pending",
      });
       console.log("attendance:new");

    return {
      message: "Atendimento criado com sucesso",
      id,
    };
  }

  /**
   * LIST — GET /atendimentos
   */
  async list(limit = 50) {
    const rows = await database
      .select()
      .from(atendimentos)
      .orderBy(asc(atendimentos.created_at))
      .limit(limit);

    return rows;
  }

  /**
   * FINISH — PATCH /atendimentos/:id/finish
   * (simulado por enquanto, pois sua tabela não tem status/id)
   */
  async finish(id: string) {
    await database
      .update(atendimentos)
      .set({ status: "finished" })
      .where(eq(atendimentos.id, id));

      console.log("🔥 Emitindo attendance:finished", id);
      
      io.emit("attendance:finished", { id });

    return {
      message: `Atendimento ${id} finalizado com sucesso`
    };
  }
}

export default new AtendimentoService();
