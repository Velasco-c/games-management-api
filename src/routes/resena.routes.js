import { Router } from "express";
import * as ctrl from "../controllers/resena.controller.js";
import {
  idValidator,
  filtrosResenaValidator,
  crearResenaValidator,
  actualizarResenaValidator,
} from "../validators/resena.validator.js";
import { validarRequest } from "../middlewares/validar-request.middleware.js";

const router = Router();

router.get("/", filtrosResenaValidator, validarRequest, ctrl.listar);
router.get("/:id", idValidator, validarRequest, ctrl.obtener);
router.post("/", crearResenaValidator, validarRequest, ctrl.crear);
router.patch("/:id", idValidator, actualizarResenaValidator, validarRequest, ctrl.actualizar);
router.delete("/:id", idValidator, validarRequest, ctrl.eliminar);

export default router;
