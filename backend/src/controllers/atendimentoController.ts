import { Request, Response } from "express";
import { AtendimentosService } from "../services/atendimentos.service";

const atendimentosService = new AtendimentosService();

export class AtendimentosController {
  async listar(_req: Request, res: Response) {
    try {
      const lista = await atendimentosService.listar();
      return res.status(200).json(lista);
    } catch (error) {
      console.error("Erro ao listar atendimentos:", error);
      return res.status(500).json({
        error: "Erro ao listar atendimentos.",
      });
    }
  }

  async criar(req: Request, res: Response) {
    try {
      const { tipo } = req.body;

      const novoAtendimento = await atendimentosService.criar(tipo);

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

  async finalizar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const atendimentoFinalizado = await atendimentosService.finalizar(id);

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