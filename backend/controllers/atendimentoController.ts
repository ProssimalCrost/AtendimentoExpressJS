class AttendimentoController {
    // Criar atendimento
   async create(req, res) {
        // Logica para criar atendimento
        const {name, description} = req.body
        const result = await AttendimentoController.create({name, description})
        return res.json(result)
    }
    
   async list(req, res) {
        // Logica para listar atendiemntos
        const result = await AttendimentoController.list();
        return res.json(result)
    }
   async finish(req, res) {
        // Logica para finalizar atendimento
        const {id} = req.params;
        const result = await AttendimentoController.finish(id);
        return res.json(result);
    }
}

export default new  AttendimentoController();