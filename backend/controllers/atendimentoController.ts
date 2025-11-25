import AttendimentoService from '../services/services.ts'
import { response, type Request, type Response } from "express";


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
        return res.status(201).json(result); }

    async list(req: Request, res: Response) {
        const result = await AttendimentoService.list();
        return res.status(200).json(result)
    };
    
    async finish(req: Request, res: Response) {
        const {id} = req.params;
        const result = await AttendimentoService.finish(id);
        return res.status(200).json(result)
    };
  
} 

    
export default new AttendimentoController();