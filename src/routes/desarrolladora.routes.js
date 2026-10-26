import { Router } from "express";
import * as ctrl from "../controllers/desarrolladora.controller.js";
import {
  idValidator,
  crearDesarrolladoraValidator,
  actualizarDesarrolladoraValidator,
} from "../validators/desarrolladora.validator.js";
import { validarRequest } from "../middlewares/validar-request.middleware.js";

const router = Router();

router.get("/", ctrl.listar);
router.get("/:id", idValidator, validarRequest, ctrl.obtener);
router.post("/", crearDesarrolladoraValidator, validarRequest, ctrl.crear);
router.patch("/:id", idValidator, actualizarDesarrolladoraValidator, validarRequest, ctrl.actualizar);
router.delete("/:id", idValidator, validarRequest, ctrl.eliminar);

export default router;
