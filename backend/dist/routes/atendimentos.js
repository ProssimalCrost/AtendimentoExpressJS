"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const atendimentoController_js_1 = __importDefault(require("../controllers/atendimentoController.js"));
const router = (0, express_1.Router)();
exports.router = router;
//-- Rotas de Usuario --
router.post('/', (req, res) => atendimentoController_js_1.default.create(req, res));
router.get('/', (req, res) => atendimentoController_js_1.default.list(req, res));
router.patch('/:id/finish', (req, res) => atendimentoController_js_1.default.finish(req, res));
//# sourceMappingURL=atendimentos.js.map