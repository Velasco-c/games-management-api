const CAMPOS = ["calificacion", "comentario"];

export function actualizarResenaDto(body) {
  const datos = body ?? {};
  const dto = {};
  for (const campo of CAMPOS) {
    if (datos[campo] !== undefined) {
      dto[campo] = datos[campo];
    }
  }
  return dto;
}
