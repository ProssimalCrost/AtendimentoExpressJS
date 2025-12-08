interface Attendimento {
    id: string;
    name: string;
    description: string | null;
    status: "pending" | "finished";
    created_at: Date;
}

const attendimento: Attendimento[] = []

class AttendimentoService {
    // Criar atendimento
    async create(data: Attendimento) {
        // Logica para criar atendimento
        const newAttendimento: Attendimento = {
            id: Date.now().toString(),
            name: data.name,
            description: data.description || null,
            status: "pending",
            created_at: new Date()

        }
        attendimento.push(newAttendimento);

      return {
        message: "Atendimento criado com sucesso",
        attendimento: newAttendimento
};
};

    async list() {
    // Logica para listar atendiemntos
    return prisma.attendance.findMany({
  orderBy: {
    created_at: "asc"
  }
});

};
    async finish(id: string) {
        // Logica para finalizar atendimento
        return { message: `Atendimento ${id} finalizado com sucesso` }
}
};

export default new AttendimentoService();