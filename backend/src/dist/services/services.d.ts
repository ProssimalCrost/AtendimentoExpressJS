/**A
 * Dados que vêm do controller
 */
interface CreateAtendimentoDTO {
    name: string;
    description: string | null;
    status: "pending" | "finished";
}
declare class AtendimentoService {
    create(data: CreateAtendimentoDTO): Promise<{
        message: string;
        id: `${string}-${string}-${string}-${string}-${string}`;
    }>;
    /**
     * LIST — GET /atendimentos
     */
    list(limit?: number): Promise<{
        id: string;
        name: string;
        description: string | null;
        status: string | null;
        created_at: Date;
    }[]>;
    /**
     * FINISH — PATCH /atendimentos/:id/finish
     * (simulado por enquanto, pois sua tabela não tem status/id)
     */
    finish(id: string): Promise<{
        message: string;
    }>;
}
declare const _default: AtendimentoService;
export default _default;
//# sourceMappingURL=services.d.ts.map