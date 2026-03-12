import { Router } from 'express';
import {AtendimentosController} from '../controllers/atendimentoController';

const router = Router();

//-- Rotas de Usuario --
router.post('/', (req, res) => AtendimentosController.create(req, res));

router.get('/', (req, res) => AtendimentosController.list(req, res)) 

router.patch('/:id/finish', (req, res) => AtendimentosController.finish(req, res))

export  { router };
