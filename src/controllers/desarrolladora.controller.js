import * as servicio from "../services/desarrolladora.service.js";
import { crearDesarrolladoraDto } from "../dtos/crear-desarrolladora.dto.js";
import { actualizarDesarrolladoraDto } from "../dtos/actualizar-desarrolladora.dto.js";

export async function listar(req, res) {
  const desarrolladoras = await servicio.listar();
  res.json({ data: desarrolladoras });
}

export async function obtener(req, res) {
  const desarrolladora = await servicio.obtenerPorId(req.params.id);
  res.json({ data: desarrolladora });
}

export async function crear(req, res) {
  const nueva = await servicio.crear(crearDesarrolladoraDto(req.body));
  res.status(201).json({ data: nueva });
}

export async function actualizar(req, res) {
  const actualizada = await servicio.actualizar(
    req.params.id,
    actualizarDesarrolladoraDto(req.body)
  );
  res.json({ data: actualizada });
}

export async function eliminar(req, res) {
  await servicio.eliminar(req.params.id);
  res.status(204).end();
}
