interface AttendanceData {
  name: string;
  description?: string | null;
}

class AttendimentoService {
    // Criar atendimento
     async create(data: AttendanceData) {
        // Logica para criar atendimento
        return {
            message: "Atendiemnto criado com sucesso",
            attendance: {
                id: Date.now(),
                name: data.name,
                description: data.description,
                status: "open",
                created_at: new Date()

            }
        };
    }
    
    async list() {
        // Logica para listar atendiemntos
        return []
    }
   async finish(id: string) {
        // Logica para finalizar atendimento
        return { message: `Atendimento ${id} finalizado com sucesso`}
    }
}

export default new  AttendimentoService();