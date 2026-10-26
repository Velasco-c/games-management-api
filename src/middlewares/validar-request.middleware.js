import { validationResult } from "express-validator";

export function validarRequest(req, res, next) {
  const resultado = validationResult(req);

  if (resultado.isEmpty()) {
    return next();
  }

  return res.status(400).json({ errores: resultado.array() });
}
