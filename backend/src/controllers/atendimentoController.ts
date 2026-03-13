import { Request, Response } from "express";
import atendimentosService from "../services/services";

class AtendimentosController {
  async list(_req: Request, res: Response) {
    try {
      const lista = await atendimentosService.list();
      return res.status(200).json(lista);
    } catch (error) {
      console.error("Erro ao listar atendimentos:", error);
      return res.status(500).json({
        error: "Erro ao listar atendimentos.",
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { tipo } = req.body;

      const novoAtendimento = await atendimentosService.create({ tipo });

      return res.status(201).json(novoAtendimento);
    } catch (error) {
      console.error("Erro ao criar atendimento:", error);

      if (error instanceof Error) {
        return res.status(400).json({
          error: error.message,
        });
      }

      return res.status(500).json({
        error: "Erro ao criar atendimento.",
      });
    }
  }

  async finish(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const atendimentoFinalizado = await atendimentosService.finish(id);

      return res.status(200).json(atendimentoFinalizado);
    } catch (error) {
      console.error("Erro ao finalizar atendimento:", error);

      if (error instanceof Error) {
        if (error.message === "Atendimento não encontrado.") {
          return res.status(404).json({
            error: error.message,
          });
        }

        return res.status(400).json({
          error: error.message,
        });
      }

      return res.status(500).json({
        error: "Erro ao finalizar atendimento.",
      });
    }
  }
}

export default new AtendimentosController();