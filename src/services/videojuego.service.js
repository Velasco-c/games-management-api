import * as modelo from "../models/videojuego.model.js";
import * as desarrolladoraServicio from "./desarrolladora.service.js";
import { HttpError } from "../utils/http-error.js";

export function listar(filtros) {
  return modelo.findAll(filtros);
}

export async function obtenerPorId(id) {
  const videojuego = await modelo.findById(id);
  if (!videojuego) {
    throw new HttpError(404, "Videojuego no encontrado");
  }
  return videojuego;
}

// Si se envía una desarrolladora_id, comprobamos que exista antes de guardar.
async function verificarDesarrolladora(desarrolladoraId) {
  if (desarrolladoraId !== undefined && desarrolladoraId !== null) {
    await desarrolladoraServicio.obtenerPorId(desarrolladoraId);
  }
}

export async function crear(datos) {
  await verificarDesarrolladora(datos.desarrolladora_id);
  const id = await modelo.create(datos);
  return obtenerPorId(id);
}

export async function actualizar(id, cambios) {
  await obtenerPorId(id);
  await verificarDesarrolladora(cambios.desarrolladora_id);
  await modelo.update(id, cambios);
  return obtenerPorId(id);
}

export async function eliminar(id) {
  await obtenerPorId(id);
  await modelo.remove(id);
}
