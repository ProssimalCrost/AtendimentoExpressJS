import AttendimentoService from '../services/services.js'
import { response, type Request, type Response } from "express";

class AttendimentoController {
    // Criar atendimento
    async create(req: Request, res: Response) {

        const { name, description, status } = req.body ?? {};
        console.log("REQ BODY REAL:", req.body);
        console.log("➡️ POST /atendimentos recebido", req.body);


        // 1. validação
        if (!name || name.trim() === "") {
            return res.status(400).json({ error: "O nome é obrigatório." });
        }

        // 2. a requisição, deve bater com create do service
        const result = await AttendimentoService.create({
            name: name.trim(),
            description: description?.trim() || null,
            status: status?.trim() === "finished" ? "pending" : "finished",
        });

        // 3. responder ao cliente
        return res.status(201).json(result);
    }

    async list(req: Request, res: Response) {

        const limit = Number(req.query.limit) || 50;
        const atendimentos = await AttendimentoService.list(limit)

     //  const result = await AttendimentoService.list();

        return res.status(200).json(atendimentos)
    };

    async finish(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "ID é obrigatório." });
        }

        const result = await AttendimentoService.finish(id);
        return res.status(200).json(result);

};
};

export default new AttendimentoController();