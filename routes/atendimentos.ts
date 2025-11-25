import { Router } from 'express';

const router = Router();

//-- Rotas de Usuario --
router.post('/atendimentos', (req, res) => { 
  res.send('Criar um novo atendimento');
});

export { router };
