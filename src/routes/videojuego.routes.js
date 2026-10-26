import { Router } from "express";
import * as ctrl from "../controllers/videojuego.controller.js";
import {
  idValidator,
  filtrosVideojuegoValidator,
  crearVideojuegoValidator,
  actualizarVideojuegoValidator,
} from "../validators/videojuego.validator.js";
import { validarRequest } from "../middlewares/validar-request.middleware.js";

const router = Router();

router.get("/", filtrosVideojuegoValidator, validarRequest, ctrl.listar);
router.get("/:id", idValidator, validarRequest, ctrl.obtener);
router.post("/", crearVideojuegoValidator, validarRequest, ctrl.crear);
router.patch("/:id", idValidator, actualizarVideojuegoValidator, validarRequest, ctrl.actualizar);
router.delete("/:id", idValidator, validarRequest, ctrl.eliminar);

export default router;
