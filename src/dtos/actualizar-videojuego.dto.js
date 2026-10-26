const CAMPOS = [
  "titulo",
  "plataforma",
  "genero",
  "anio_lanzamiento",
  "estado",
  "desarrolladora_id",
];

export function actualizarVideojuegoDto(body) {
  const datos = body ?? {};
  const dto = {};
  for (const campo of CAMPOS) {
    if (datos[campo] !== undefined) {
      dto[campo] = datos[campo];
    }
  }
  return dto;
}
