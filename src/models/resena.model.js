import db from "../config/db.js";

const CAMPOS_PERMITIDOS = ["calificacion", "comentario"];

const SELECT_BASE = `
  SELECT r.id, r.videojuego_id, v.titulo AS videojuego,
         r.calificacion, r.comentario, r.created_at, r.updated_at
  FROM resenas r
  INNER JOIN videojuegos v ON v.id = r.videojuego_id`;

export async function findAll({ videojuego_id } = {}) {
  let sql = `${SELECT_BASE} WHERE 1 = 1`;
  const params = [];

  if (videojuego_id) {
    sql += " AND r.videojuego_id = ?";
    params.push(videojuego_id);
  }

  sql += " ORDER BY r.created_at DESC, r.id DESC";
  const [filas] = await db.execute(sql, params);
  return filas;
}

export async function findById(id) {
  const [filas] = await db.execute(`${SELECT_BASE} WHERE r.id = ?`, [id]);
  return filas[0] ?? null;
}

export async function create({ videojuego_id, calificacion, comentario }) {
  const [resultado] = await db.execute(
    "INSERT INTO resenas (videojuego_id, calificacion, comentario) VALUES (?, ?, ?)",
    [videojuego_id, calificacion, comentario ?? null]
  );
  return resultado.insertId;
}

export async function update(id, campos) {
  const claves = Object.keys(campos).filter((c) => CAMPOS_PERMITIDOS.includes(c));
  if (claves.length === 0) return 0;

  const asignaciones = claves.map((c) => `${c} = ?`).join(", ");
  const valores = claves.map((c) => campos[c] ?? null);

  const [resultado] = await db.execute(
    `UPDATE resenas SET ${asignaciones} WHERE id = ?`,
    [...valores, id]
  );
  return resultado.affectedRows;
}

export async function remove(id) {
  const [resultado] = await db.execute("DELETE FROM resenas WHERE id = ?", [id]);
  return resultado.affectedRows;
}
