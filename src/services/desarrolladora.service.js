import * as modelo from "../models/desarrolladora.model.js";
import { HttpError } from "../utils/http-error.js";

export function listar() {
  return modelo.findAll();
}

export async function obtenerPorId(id) {
  const desarrolladora = await modelo.findById(id);
  if (!desarrolladora) {
    throw new HttpError(404, "Desarrolladora no encontrada");
  }
  return desarrolladora;
}

export async function crear(datos) {
  const id = await modelo.create(datos);
  return obtenerPorId(id);
}

export async function actualizar(id, cambios) {
  await obtenerPorId(id);
  await modelo.update(id, cambios);
  return obtenerPorId(id);
}

export async function eliminar(id) {
  await obtenerPorId(id);
  await modelo.remove(id);
}
