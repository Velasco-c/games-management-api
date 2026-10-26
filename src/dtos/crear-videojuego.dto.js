export function crearVideojuegoDto(body) {
  const datos = body ?? {};
  return {
    titulo: datos.titulo,
    plataforma: datos.plataforma,
    genero: datos.genero,
    anio_lanzamiento: datos.anio_lanzamiento,
    estado: datos.estado ?? "pendiente",
    desarrolladora_id: datos.desarrolladora_id ?? null,
  };
}
