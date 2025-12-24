import { Router } from 'express';
import AttendimentoController from '../controllers/atendimentoController';

const router = Router();

//-- Rotas de Usuario --
router.post('/', (req, res) => AttendimentoController.create(req, res));

router.get('/', (req, res) => AttendimentoController.list(req, res)) 

router.patch('/:id/finish', (req, res) => AttendimentoController.finish(req, res))

export { router };
