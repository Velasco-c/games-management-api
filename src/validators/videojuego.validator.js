import { body, param, query } from "express-validator";
import { PLATAFORMAS, GENEROS, ESTADOS } from "../constants/catalogos.js";

const anioMaximo = new Date().getFullYear() + 1;

export const idValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un entero positivo")
    .toInt(),
];

export const filtrosVideojuegoValidator = [
  query("estado")
    .optional()
    .isIn(ESTADOS)
    .withMessage(`El estado debe ser uno de: ${ESTADOS.join(", ")}`),
  query("genero")
    .optional()
    .isIn(GENEROS)
    .withMessage(`El género debe ser uno de: ${GENEROS.join(", ")}`),
];

// Crear: los campos principales son obligatorios.
// Actualizar: todos son opcionales (PATCH parcial).
function reglasVideojuego(esActualizacion) {
  const campo = (nombre) => (esActualizacion ? body(nombre).optional() : body(nombre));

  return [
    campo("titulo")
      .trim()
      .isLength({ min: 1, max: 100 })
      .withMessage("El título debe tener entre 1 y 100 caracteres"),
    campo("plataforma")
      .isIn(PLATAFORMAS)
      .withMessage(`La plataforma debe ser una de: ${PLATAFORMAS.join(", ")}`),
    campo("genero")
      .isIn(GENEROS)
      .withMessage(`El género debe ser uno de: ${GENEROS.join(", ")}`),
    campo("anio_lanzamiento")
      .isInt({ min: 1970, max: anioMaximo })
      .withMessage(`El año de lanzamiento debe estar entre 1970 y ${anioMaximo}`)
      .toInt(),
    body("estado")
      .optional()
      .isIn(ESTADOS)
      .withMessage(`El estado debe ser uno de: ${ESTADOS.join(", ")}`),
    body("desarrolladora_id")
      .optional({ values: "null" })
      .isInt({ min: 1 })
      .withMessage("La desarrolladora_id debe ser un entero positivo")
      .toInt(),
  ];
}

export const crearVideojuegoValidator = reglasVideojuego(false);
export const actualizarVideojuegoValidator = reglasVideojuego(true);
