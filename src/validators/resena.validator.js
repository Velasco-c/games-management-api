import { body, param, query } from "express-validator";

export const idValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un entero positivo")
    .toInt(),
];

export const filtrosResenaValidator = [
  query("videojuego_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El videojuego_id debe ser un entero positivo")
    .toInt(),
];

export const crearResenaValidator = [
  body("videojuego_id")
    .isInt({ min: 1 })
    .withMessage("El videojuego_id es obligatorio y debe ser un entero positivo")
    .toInt(),
  body("calificacion")
    .isInt({ min: 1, max: 5 })
    .withMessage("La calificación debe ser un entero entre 1 y 5")
    .toInt(),
  body("comentario")
    .optional({ values: "null" })
    .trim()
    .isLength({ max: 500 })
    .withMessage("El comentario no puede superar los 500 caracteres"),
];

export const actualizarResenaValidator = [
  body("calificacion")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("La calificación debe ser un entero entre 1 y 5")
    .toInt(),
  body("comentario")
    .optional({ values: "null" })
    .trim()
    .isLength({ max: 500 })
    .withMessage("El comentario no puede superar los 500 caracteres"),
];
