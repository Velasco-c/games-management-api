export function crearDesarrolladoraDto(body) {
  const datos = body ?? {};
  return {
    nombre: datos.nombre,
    pais: datos.pais,
    anio_fundacion: datos.anio_fundacion ?? null,
  };
}
