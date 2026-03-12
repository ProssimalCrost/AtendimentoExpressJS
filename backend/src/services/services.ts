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

class atendimentosService {
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
    const existing = await database
      .select()
      .from(atendimentos)
      .where(eq(atendimentos.id, id))
      .limit(1);

    if (existing.length === 0) {
      throw new Error("Atendimento não encontrado.");
    }

    if (existing[0].status === "finished") {
      throw new Error("Atendimento já foi finalizado.");
    }

    await database
      .update(atendimentos)
      .set({ status: "finished" })
      .where(eq(atendimentos.id, id));

    return {
      message: `Atendimento ${id} finalizado com sucesso`,
      id,
      tipo: existing[0].tipo,
      tipoLabel: tiposAtendimento[existing[0].tipo] ?? "Desconhecido",
      status: "finished",
    };
  }
}

export default new atendimentosService();