import AttendimentoService from '../services/services.ts'
import type { Request, Response } from "express";

class AttendimentoController {
    // Criar atendimento
    async create(req: Request, res: Response) {
        const { name, description } = req.body;

        // 1. validação
        if (!name || name.trim() === "") {
            return res.status(400).json({ error: "O nome é obrigatório." });
        }

        // 2. enviar pro service
        const result = await AttendimentoService.create({
            name: name.trim(),
            description: description?.trim() || null
        });

        // 3. responder ao cliente
        return res.status(201).json(result);
    }}

export default new AttendimentoController();