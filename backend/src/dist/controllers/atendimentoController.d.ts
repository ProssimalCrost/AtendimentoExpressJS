import { type Request, type Response } from "express";
declare class AttendimentoController {
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    list(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    finish(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: AttendimentoController;
export default _default;
//# sourceMappingURL=atendimentoController.d.ts.map