import * as modelo from "../models/resena.model.js";
import * as videojuegoServicio from "./videojuego.service.js";
import { HttpError } from "../utils/http-error.js";

export function listar(filtros) {
  return modelo.findAll(filtros);
}

export async function obtenerPorId(id) {
  const resena = await modelo.findById(id);
  if (!resena) {
    throw new HttpError(404, "Reseña no encontrada");
  }
  return resena;
}

export async function crear(datos) {
  // Comprobamos que el videojuego exista (si no, lanza 404).
  await videojuegoServicio.obtenerPorId(datos.videojuego_id);
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
