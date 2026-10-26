import * as servicio from "../services/resena.service.js";
import { crearResenaDto } from "../dtos/crear-resena.dto.js";
import { actualizarResenaDto } from "../dtos/actualizar-resena.dto.js";

export async function listar(req, res) {
  const resenas = await servicio.listar({
    videojuego_id: req.query.videojuego_id,
  });
  res.json({ data: resenas });
}

export async function obtener(req, res) {
  const resena = await servicio.obtenerPorId(req.params.id);
  res.json({ data: resena });
}

export async function crear(req, res) {
  const nueva = await servicio.crear(crearResenaDto(req.body));
  res.status(201).json({ data: nueva });
}

export async function actualizar(req, res) {
  const actualizada = await servicio.actualizar(
    req.params.id,
    actualizarResenaDto(req.body)
  );
  res.json({ data: actualizada });
}

export async function eliminar(req, res) {
  await servicio.eliminar(req.params.id);
  res.status(204).end();
}
