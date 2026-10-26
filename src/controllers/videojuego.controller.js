import * as servicio from "../services/videojuego.service.js";
import { crearVideojuegoDto } from "../dtos/crear-videojuego.dto.js";
import { actualizarVideojuegoDto } from "../dtos/actualizar-videojuego.dto.js";

export async function listar(req, res) {
  const videojuegos = await servicio.listar({
    estado: req.query.estado,
    genero: req.query.genero,
  });
  res.json({ data: videojuegos });
}

export async function obtener(req, res) {
  const videojuego = await servicio.obtenerPorId(req.params.id);
  res.json({ data: videojuego });
}

export async function crear(req, res) {
  const nuevo = await servicio.crear(crearVideojuegoDto(req.body));
  res.status(201).json({ data: nuevo });
}

export async function actualizar(req, res) {
  const actualizado = await servicio.actualizar(
    req.params.id,
    actualizarVideojuegoDto(req.body)
  );
  res.json({ data: actualizado });
}

export async function eliminar(req, res) {
  await servicio.eliminar(req.params.id);
  res.status(204).end();
}
