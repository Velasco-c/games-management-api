import db from "../config/db.js";

const CAMPOS_PERMITIDOS = [
  "titulo",
  "plataforma",
  "genero",
  "anio_lanzamiento",
  "estado",
  "desarrolladora_id",
];

const SELECT_LISTA = `
  SELECT v.id, v.titulo, v.plataforma, v.genero, v.anio_lanzamiento,
         v.estado, v.desarrolladora_id, d.nombre AS desarrolladora,
         v.created_at, v.updated_at
  FROM videojuegos v
  LEFT JOIN desarrolladoras d ON d.id = v.desarrolladora_id`;

export async function findAll({ estado, genero } = {}) {
  let sql = `${SELECT_LISTA} WHERE 1 = 1`;
  const params = [];

  if (estado) {
    sql += " AND v.estado = ?";
    params.push(estado);
  }
  if (genero) {
    sql += " AND v.genero = ?";
    params.push(genero);
  }

  sql += " ORDER BY v.titulo ASC";
  const [filas] = await db.execute(sql, params);
  return filas;
}

export async function findById(id) {
  const [filas] = await db.execute(
    `SELECT v.id, v.titulo, v.plataforma, v.genero, v.anio_lanzamiento,
            v.estado, v.desarrolladora_id, d.nombre AS desarrolladora,
            (SELECT ROUND(AVG(r.calificacion), 1) FROM resenas r
               WHERE r.videojuego_id = v.id) AS calificacion_promedio,
            (SELECT COUNT(*) FROM resenas r
               WHERE r.videojuego_id = v.id) AS total_resenas,
            v.created_at, v.updated_at
     FROM videojuegos v
     LEFT JOIN desarrolladoras d ON d.id = v.desarrolladora_id
     WHERE v.id = ?`,
    [id]
  );
  return filas[0] ?? null;
}

export async function create({ titulo, plataforma, genero, anio_lanzamiento, estado, desarrolladora_id }) {
  const [resultado] = await db.execute(
    `INSERT INTO videojuegos
       (titulo, plataforma, genero, anio_lanzamiento, estado, desarrolladora_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [titulo, plataforma, genero, anio_lanzamiento, estado ?? "pendiente", desarrolladora_id ?? null]
  );
  return resultado.insertId;
}

export async function update(id, campos) {
  const claves = Object.keys(campos).filter((c) => CAMPOS_PERMITIDOS.includes(c));
  if (claves.length === 0) return 0;

  const asignaciones = claves.map((c) => `${c} = ?`).join(", ");
  const valores = claves.map((c) => campos[c] ?? null);

  const [resultado] = await db.execute(
    `UPDATE videojuegos SET ${asignaciones} WHERE id = ?`,
    [...valores, id]
  );
  return resultado.affectedRows;
}

export async function remove(id) {
  const [resultado] = await db.execute("DELETE FROM videojuegos WHERE id = ?", [id]);
  return resultado.affectedRows;
}
