export function crearResenaDto(body) {
  const datos = body ?? {};
  return {
    videojuego_id: datos.videojuego_id,
    calificacion: datos.calificacion,
    comentario: datos.comentario ?? null,
  };
}
