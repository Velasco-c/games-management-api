# Validadores

## ¿Por qué validar?

Nunca debes confiar en lo que envía el cliente. Un usuario puede enviar un título vacío, un año de `"abc"` o una calificación de `99`. Validar antes de llegar a la base de datos protege los datos y da mensajes claros al cliente.

## Anatomía de una regla

```js
body("titulo")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("El título debe tener entre 1 y 100 caracteres")
```

Una regla se lee de izquierda a derecha:

| Parte              | Qué hace                                                     |
| ------------------ | ------------------------------------------------------------ |
| `body("titulo")`   | Indica dónde buscar el campo: `body`, `param` o `query`      |
| `.trim()`          | **Sanitizador**: quita espacios al inicio y al final         |
| `.isLength(...)`   | **Validador**: comprueba la longitud                         |
| `.withMessage(...)` | Mensaje de error si la regla anterior falla                 |

Los sanitizadores **transforman** el valor. Los validadores **comprueban** el valor y registran errores.

## Fuentes de datos

| Función  | Busca en                              | Ejemplo                               |
| -------- | ------------------------------------- | ------------------------------------- |
| `body`   | El cuerpo JSON                        | `body("pais")`                        |
| `param`  | Parámetros de la ruta                 | `param("id")` en `/:id`               |
| `query`  | Parámetros de la URL (`?estado=...`)  | `query("estado")`                     |

## Validadores más usados

| Validador            | Ejemplo                                 | Significado                           |
| -------------------- | --------------------------------------- | ------------------------------------- |
| `isLength`           | `{ min: 2, max: 80 }`                   | Entre 2 y 80 caracteres               |
| `isInt`              | `{ min: 1, max: 5 }`                    | Entero dentro de un rango             |
| `isIn`               | `ESTADOS`                               | Debe estar en una lista               |
| `optional()`         | `body("pais").optional()`               | Si no viene el campo, se ignora       |
| `optional({ values: "null" })` | `body("anio").optional({ values: "null" })` | Si viene `null` o no viene, se ignora |
| `toInt()`            | `.toInt()`                              | Convierte `"3"` en `3`                |

## Crear vs actualizar

Crear necesita todos los campos obligatorios. Actualizar (PATCH) solo revisa lo que llegue. En `videojuego.validator.js` se usa una función que genera las dos versiones:

```js
function reglasVideojuego(esActualizacion) {
  const campo = (nombre) => (esActualizacion ? body(nombre).optional() : body(nombre));
  return [ campo("titulo").trim().isLength({ min: 1, max: 100 }), /* ... */ ];
}

export const crearVideojuegoValidator = reglasVideojuego(false);
export const actualizarVideojuegoValidator = reglasVideojuego(true);
```

Así no repites las mismas reglas dos veces. Es un patrón de **fábrica de funciones**.

## Catálogos cerrados

`src/constants/catalogos.js` contiene las listas permitidas. Los validadores las usan con `isIn`, y los mensajes de error las listan automáticamente:

```js
.isIn(PLATAFORMAS)
.withMessage(`La plataforma debe ser una de: ${PLATAFORMAS.join(", ")}`)
```

## Respuesta de error (400)

```json
{
  "errores": [
    {
      "type": "field",
      "value": "Atari",
      "msg": "La plataforma debe ser una de: PC, PlayStation, Xbox, Nintendo Switch, Móvil",
      "path": "plataforma",
      "location": "body"
    }
  ]
}
```

## Errores comunes

- Orden incorrecto: `toInt()` debe ir **después** de `isInt()`. Si conviertes antes, el valor ya no es texto y la validación pierde sentido.
- Olvidar `optional()` en PATCH: un campo ausente se marcaría como error.
- Usar `optional()` cuando el campo es `null` permitido: en ese caso usa `optional({ values: "null" })`.

## Ejercicio

Agrega al validador de desarrolladoras una regla que limite `pais` a valores que empiecen con mayúscula (pista: busca un validador de expresión regular con `matches`). Prueba enviando `"japón"` y `"Japón"`.
