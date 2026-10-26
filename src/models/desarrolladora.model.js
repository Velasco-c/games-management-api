import db from "../config/db.js";

const COLUMNAS = "id, nombre, pais, anio_fundacion, created_at, updated_at";
const CAMPOS_PERMITIDOS = ["nombre", "pais", "anio_fundacion"];

export async function findAll() {
  const [filas] = await db.execute(
    `SELECT ${COLUMNAS} FROM desarrolladoras ORDER BY nombre ASC`
  );
  return filas;
}

export async function findById(id) {
  const [filas] = await db.execute(
    `SELECT ${COLUMNAS} FROM desarrolladoras WHERE id = ?`,
    [id]
  );
  return filas[0] ?? null;
}

export async function create({ nombre, pais, anio_fundacion }) {
  const [resultado] = await db.execute(
    "INSERT INTO desarrolladoras (nombre, pais, anio_fundacion) VALUES (?, ?, ?)",
    [nombre, pais, anio_fundacion ?? null]
  );
  return resultado.insertId;
}

export async function update(id, campos) {
  const claves = Object.keys(campos).filter((c) => CAMPOS_PERMITIDOS.includes(c));
  if (claves.length === 0) return 0;

  const asignaciones = claves.map((c) => `${c} = ?`).join(", ");
  const valores = claves.map((c) => campos[c] ?? null);

  const [resultado] = await db.execute(
    `UPDATE desarrolladoras SET ${asignaciones} WHERE id = ?`,
    [...valores, id]
  );
  return resultado.affectedRows;
}

export async function remove(id) {
  const [resultado] = await db.execute(
    "DELETE FROM desarrolladoras WHERE id = ?",
    [id]
  );
  return resultado.affectedRows;
}
