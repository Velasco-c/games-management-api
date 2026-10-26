import { HttpError } from "../utils/http-error.js";

export function rutaNoEncontrada(req, res) {
  res.status(404).json({ error: "Ruta no encontrada" });
}

export function manejarError(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof HttpError) {
    return res.status(error.status).json({ error: error.message });
  }

  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ error: "El cuerpo de la petición no es un JSON válido" });
  }

  if (error.code === "ER_DUP_ENTRY") {
    return res.status(409).json({ error: "Ya existe un registro con ese valor único" });
  }

  if (error.code === "ER_NO_REFERENCED_ROW_2") {
    return res.status(400).json({ error: "Una de las referencias indicadas no existe" });
  }

  console.error(error);
  return res.status(500).json({ error: "Error interno del servidor" });
}
