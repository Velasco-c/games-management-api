const CAMPOS = ["nombre", "pais", "anio_fundacion"];

export function actualizarDesarrolladoraDto(body) {
  const datos = body ?? {};
  const dto = {};
  for (const campo of CAMPOS) {
    if (datos[campo] !== undefined) {
      dto[campo] = datos[campo];
    }
  }
  return dto;
}
