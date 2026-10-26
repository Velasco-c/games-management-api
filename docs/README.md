# Documentación del proyecto

Esta carpeta explica, sección por sección, cómo funciona `games-management-api`. Está pensada para que puedas leer el código con las explicaciones al lado, aunque no tengas experiencia previa con Express, MySQL o APIs REST.

## Ruta de aprendizaje

Lee los documentos en este orden. Cada uno se apoya en el anterior.

| Paso | Documento                                                      | Qué aprenderás                                             |
| ---- | -------------------------------------------------------------- | ---------------------------------------------------------- |
| 1    | [Arquitectura](explicacion-arquitectura.md)                    | Cómo se organiza el proyecto en capas y cómo viaja una petición |
| 2    | [Base de datos](explicacion-base-de-datos.md)                  | Tablas, relaciones, claves foráneas e índices              |
| 3    | [Configuración](explicacion-configuracion.md)                  | Variables de entorno, conexión a MySQL, `server.js` y `app.js` |
| 4    | [Rutas](explicacion-rutas.md)                                  | Qué endpoints existen y cómo se conectan con el código     |
| 5    | [Middlewares](explicacion-middlewares.md)                      | Funciones intermedias, manejo de errores y `next()`        |
| 6    | [Validadores](explicacion-validadores.md)                      | Cómo se revisan y limpian los datos de entrada             |
| 7    | [DTOs](explicacion-dtos.md)                                    | Qué campos se permiten guardar y por qué                   |
| 8    | [Controladores](explicacion-controladores.md)                  | Cómo se reciben peticiones y se devuelven respuestas       |
| 9    | [Servicios](explicacion-servicios.md)                          | Dónde vive la lógica de negocio                            |
| 10   | [Modelos](explicacion-modelos.md)                              | Cómo se hablan con la base de datos mediante SQL           |

## Glosario rápido

- **API REST:** forma de exponer datos por internet mediante URLs (endpoints) y métodos HTTP (`GET`, `POST`, `PATCH`, `DELETE`).
- **Endpoint:** combinación de método y ruta, por ejemplo `POST /api/v1/resenas`.
- **Middleware:** función que recibe la petición, puede modificarla o revisarla, y decide si pasa a la siguiente.
- **CRUD:** las cuatro operaciones básicas sobre datos: Crear (Create), Leer (Read), Actualizar (Update) y Eliminar (Delete).
- **Clave primaria (PK):** identificador único de cada fila de una tabla.
- **Clave foránea (FK):** columna que apunta a la clave primaria de otra tabla y une ambas.
- **DTO (Data Transfer Object):** objeto que define exactamente qué datos pasan entre capas.

## Convenciones del código

- Los nombres de archivos siguen el formato `recurso.capa.js`, por ejemplo `videojuego.service.js`.
- Los nombres de funciones, variables y campos de la base de datos están en español.
- Las capas solo se llaman hacia abajo: rutas → validadores → controladores → servicios → modelos → base de datos.
