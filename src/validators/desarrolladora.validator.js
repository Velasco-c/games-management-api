import { body, param } from "express-validator";

const anioActual = new Date().getFullYear();

export const idValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un entero positivo")
    .toInt(),
];

export const crearDesarrolladoraValidator = [
  body("nombre")
    .trim()
    .isLength({ min: 2, max: 80 })
    .withMessage("El nombre debe tener entre 2 y 80 caracteres"),
  body("pais")
    .trim()
    .isLength({ min: 2, max: 60 })
    .withMessage("El país debe tener entre 2 y 60 caracteres"),
  body("anio_fundacion")
    .optional({ values: "null" })
    .isInt({ min: 1950, max: anioActual })
    .withMessage(`El año de fundación debe estar entre 1950 y ${anioActual}`)
    .toInt(),
];

export const actualizarDesarrolladoraValidator = [
  body("nombre")
    .optional()
    .trim()
    .isLength({ min: 2, max: 80 })
    .withMessage("El nombre debe tener entre 2 y 80 caracteres"),
  body("pais")
    .optional()
    .trim()
    .isLength({ min: 2, max: 60 })
    .withMessage("El país debe tener entre 2 y 60 caracteres"),
  body("anio_fundacion")
    .optional({ values: "null" })
    .isInt({ min: 1950, max: anioActual })
    .withMessage(`El año de fundación debe estar entre 1950 y ${anioActual}`)
    .toInt(),
];
