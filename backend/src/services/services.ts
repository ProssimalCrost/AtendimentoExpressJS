import { database } from "../database/drizzle.js";
import { atendimentos } from "../database/schema.js";
import { asc, eq } from "drizzle-orm";
import crypto from "crypto";

interface CreateAtendimentoDTO {
  name: string;
  description: string | null;
  status: "pending" | "finished";
}

class AtendimentoService {
  async create(data: CreateAtendimentoDTO) {
    const id = crypto.randomUUID();

    await database
      .insert(atendimentos)
      .values({
        id,
        name: data.name,
        description: data.description,
        status: "pending",
      });

    return {
      message: "Atendimento criado com sucesso",
      id,
    };
  }

  async list(limit = 50) {
    const rows = await database
      .select()
      .from(atendimentos)
      .orderBy(asc(atendimentos.created_at))
      .limit(limit);

    return rows;
  }

  async finish(id: string) {
    await database
      .update(atendimentos)
      .set({ status: "finished" })
      .where(eq(atendimentos.id, id));

    return {
      message: `Atendimento ${id} finalizado com sucesso`,
    };
  }
}

export default new AtendimentoService();