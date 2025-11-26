interface Attendimento {
  id: string;
  name: string;
  description: string | null;
  status: "pending" | "finished";
  created_at: Date;
}

const attendances: Attendimento[] = []

class AttendimentoService {
    // Criar atendimento
     async create(data: Attendimento) {
        // Logica para criar atendimento
        return {
            message: "Atendiemnto criado com sucesso",
            attendimento: {
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