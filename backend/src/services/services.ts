import { database } from "../../drizzle/drizzle";
import { atendimentos } from "../../drizzle/schema";
import { asc, eq } from "drizzle-orm";
import crypto from "crypto";

interface CreateAtendimentoDTO {
  tipo: number;
}

const tiposAtendimento: Record<number, string> = {
  1: "Pagamento de mensalidade de esporte",
  2: "Pagamento de associação",
  3: "Matrícula do esporte",
  4: "Se associar",
  5: "Informação",
  6: "Outros",
};

class AtendimentoService {
  async create(data: CreateAtendimentoDTO) {
    if (!tiposAtendimento[data.tipo]) {
      throw new Error("Tipo de atendimento inválido");
    }

    const id = crypto.randomUUID();

    await database.insert(atendimentos).values({
      id,
      tipo: data.tipo,
      status: "pending",
    });

    return {
      message: "Atendimento criado com sucesso",
      id,
      tipo: data.tipo,
      tipoLabel: tiposAtendimento[data.tipo],
    };
  }

  async list() {
    try {
      const rows = await database
        .select()
        .from(atendimentos)
        .orderBy(asc(atendimentos.createdAt));

      return rows.map((item) => ({
        ...item,
        tipoLabel: tiposAtendimento[item.tipo] ?? "Desconhecido",
      }));
    } catch (error) {
      console.error("Error fetching atendimentos:", error);
      throw error;
    }
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