import { Router } from 'express';
import AttendimentoController from '../controllers/atendimentoController.ts';
 

const router = Router();

//-- Rotas de Usuario --
router.post('/atendimentos', (req, res) => AttendimentoController.create(req, res));

router.get('/atendiemntos', (req, res) => AttendimentoController.list(req, res)) 

router.patch('/atendiemntos/:id/finish', (req, res) => AttendimentoController.finish(req, res))

export { router };
