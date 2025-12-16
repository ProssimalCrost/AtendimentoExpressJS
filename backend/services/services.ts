import { database } from "../database/drizzle.ts";
import { atendimentos } from "../database/schema.ts";

/**
 * Dados que vêm do controller
 */
interface CreateAtendimentoDTO {
  name: string;
  description: string | null;
}

  const id = crypto.randomUUID();

class AtendimentoService {

  /**
   * CREATE — POST /atendimentos
   */

  async create(data: CreateAtendimentoDTO) {
     
    // INSERT no banco (sem returning)
    await database
      .insert(atendimentos)
      .values({
        name: data.name,
        description: data.description,
        // status e created_at ficam por conta do banco
      });

    return {
      message: "Atendimento criado com sucesso",
      id,
    };
  }

  /**
   * LIST — GET /atendimentos
   */
  async list() {
    const rows = await database
      .select()
      .from(atendimentos);

    return rows;
  }

  /**
   * FINISH — PATCH /atendimentos/:id/finish
   * (simulado por enquanto, pois sua tabela não tem status/id)
   */
  async finish(id: string) {
    return {
      message: `Atendimento ${id} finalizado com sucesso`
    };
  }
}

export default new AtendimentoService();
