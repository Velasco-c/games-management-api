# games-management-api

API REST para gestionar un catálogo de videojuegos, sus desarrolladoras y las reseñas de los usuarios. Está construida con **Node.js**, **Express 5** y **MySQL 8**, y organizada en capas independientes (rutas, validadores, controladores, servicios, modelos y DTOs).

## Características

- CRUD completo de **desarrolladoras**, **videojuegos** y **reseñas**.
- Relaciones entre tablas con claves foráneas: una desarrolladora publica muchos videojuegos y un videojuego recibe muchas reseñas.
- Filtros por estado y género en videojuegos, y por videojuego en reseñas.
- Calificación promedio de cada videojuego calculada directamente con SQL.
- Validación y saneamiento de datos con `express-validator`.
- Respuestas de error con formato uniforme.
- Documentación didáctica por sección en la carpeta [`docs/`](docs/README.md).

## Tecnologías

| Tecnología           | Uso                                                    |
| -------------------- | ------------------------------------------------------ |
| Node.js (ES Modules) | Entorno de ejecución                                   |
| Express 5            | Servidor HTTP, rutas y middlewares                     |
| MySQL 8              | Almacenamiento de datos                                |
| mysql2               | Conexión a MySQL con consultas parametrizadas          |
| express-validator    | Validación y saneamiento de las peticiones             |
| dotenv               | Carga de variables de entorno desde `.env`             |

## Estructura del proyecto

```
games-management-api/
├── database/
│   └── schema.sql                        # Crea la base de datos y las 3 tablas
├── docs/                                 # Explicaciones didácticas de cada sección
│   ├── README.md                         # Índice y ruta de aprendizaje
│   ├── explicacion-arquitectura.md
│   ├── explicacion-base-de-datos.md
│   ├── explicacion-configuracion.md
│   ├── explicacion-rutas.md
│   ├── explicacion-middlewares.md
│   ├── explicacion-validadores.md
│   ├── explicacion-dtos.md
│   ├── explicacion-controladores.md
│   ├── explicacion-servicios.md
│   └── explicacion-modelos.md
├── src/
│   ├── app.js                            # Configuración de Express y montaje de rutas
│   ├── server.js                         # Punto de entrada: verifica MySQL e inicia el servidor
│   ├── config/
│   │   └── db.js                         # Pool de conexiones a MySQL
│   ├── constants/
│   │   └── catalogos.js                  # Plataformas, géneros y estados permitidos
│   ├── controllers/                      # Reciben la petición HTTP y devuelven la respuesta
│   ├── dtos/                             # Filtran los campos que se pueden guardar
│   ├── middlewares/                      # Errores, validación y rutas no encontradas
│   ├── models/                           # Consultas SQL a las tablas
│   ├── routes/                           # Definen los endpoints de cada recurso
│   ├── services/                         # Lógica de negocio
│   ├── utils/
│   │   └── http-error.js                 # Error con código HTTP
│   └── validators/                       # Reglas de validación de las peticiones
├── .env.example
├── .gitignore
└── package.json
```

## Modelo de datos

| Tabla            | Descripción                                 | Relación                                              |
| ---------------- | ------------------------------------------- | ----------------------------------------------------- |
| `desarrolladoras`| Estudios que crean los videojuegos          | Una desarrolladora tiene muchos videojuegos           |
| `videojuegos`    | Catálogo de juegos con su estado            | Pertenece a una desarrolladora (opcional)             |
| `resenas`        | Calificaciones y comentarios de un juego    | Pertenece a un videojuego (se borra con él)           |

Detalles completos en [`docs/explicacion-base-de-datos.md`](docs/explicacion-base-de-datos.md).

## Requisitos

- Node.js 20 o superior
- npm
- MySQL 8.0 o superior

## Instalación

1. Clona el repositorio e instala las dependencias:

   ```bash
   git clone git@github.com:Velasco-c/games-management-api.git
   cd games-management-api
   npm install
   ```

2. Crea la base de datos y las tablas:

   ```bash
   mysql -u root -p < database/schema.sql
   ```

   > **Advertencia:** `schema.sql` elimina la base de datos `games_api` si ya existe. Úsalo solo en desarrollo.

3. Crea el archivo de configuración a partir de la plantilla y ajusta los valores:

   ```bash
   cp .env.example .env
   ```

## Variables de entorno

| Variable      | Descripción                              | Valor de ejemplo |
| ------------- | ---------------------------------------- | ---------------- |
| `APP_PORT`    | Puerto en el que escucha la API          | `3000`           |
| `DB_HOST`     | Host del servidor MySQL                  | `127.0.0.1`      |
| `DB_PORT`     | Puerto del servidor MySQL                | `3306`           |
| `DB_NAME`     | Nombre de la base de datos               | `games_api`      |
| `DB_USER`     | Usuario de MySQL                         | `root`           |
| `DB_PASSWORD` | Contraseña del usuario de MySQL          | `********`       |

El archivo `.env` contiene credenciales, por eso está excluido del control de versiones.

## Ejecución

```bash
# Modo producción
npm start

# Modo desarrollo (reinicia el servidor al detectar cambios)
npm run dev
```

Para comprobar que la API funciona:

```bash
curl http://localhost:3000/health
```

```json
{ "estado": "ok", "version": "1.0.0" }
```

## Endpoints

Base URL: `http://localhost:3000`

| Método   | Ruta                              | Descripción                                             | Éxito |
| -------- | --------------------------------- | ------------------------------------------------------- | ----- |
| `GET`    | `/health`                         | Estado del servicio                                     | `200` |
| `GET`    | `/api/v1/desarrolladoras`         | Lista las desarrolladoras por nombre                    | `200` |
| `POST`   | `/api/v1/desarrolladoras`         | Crea una desarrolladora                                 | `201` |
| `GET`    | `/api/v1/desarrolladoras/:id`     | Obtiene una desarrolladora                              | `200` |
| `PATCH`  | `/api/v1/desarrolladoras/:id`     | Actualiza uno o más campos                              | `200` |
| `DELETE` | `/api/v1/desarrolladoras/:id`     | Elimina una desarrolladora (sus juegos quedan sin estudio) | `204` |
| `GET`    | `/api/v1/videojuegos`             | Lista videojuegos. Filtros: `?estado=` y `?genero=`     | `200` |
| `POST`   | `/api/v1/videojuegos`             | Crea un videojuego                                      | `201` |
| `GET`    | `/api/v1/videojuegos/:id`         | Obtiene un videojuego con su promedio y total de reseñas | `200` |
| `PATCH`  | `/api/v1/videojuegos/:id`         | Actualiza uno o más campos                              | `200` |
| `DELETE` | `/api/v1/videojuegos/:id`         | Elimina un videojuego y sus reseñas                     | `204` |
| `GET`    | `/api/v1/resenas`                 | Lista reseñas. Filtro: `?videojuego_id=`                | `200` |
| `POST`   | `/api/v1/resenas`                 | Crea una reseña para un videojuego existente            | `201` |
| `GET`    | `/api/v1/resenas/:id`             | Obtiene una reseña                                      | `200` |
| `PATCH`  | `/api/v1/resenas/:id`             | Actualiza la calificación o el comentario               | `200` |
| `DELETE` | `/api/v1/resenas/:id`             | Elimina una reseña                                      | `204` |

Las peticiones con cuerpo deben enviarse como JSON con la cabecera `Content-Type: application/json`.

### Ejemplos

Crear una desarrolladora:

```bash
curl -X POST http://localhost:3000/api/v1/desarrolladoras \
  -H "Content-Type: application/json" \
  -d '{"nombre": "FromSoftware", "pais": "Japón", "anio_fundacion": 1986}'
```

Crear un videojuego:

```bash
curl -X POST http://localhost:3000/api/v1/videojuegos \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Elden Ring", "plataforma": "PC", "genero": "RPG", "anio_lanzamiento": 2022, "estado": "jugando", "desarrolladora_id": 1}'
```

Listar solo los juegos completados:

```bash
curl "http://localhost:3000/api/v1/videojuegos?estado=completado"
```

Calificar un juego:

```bash
curl -X POST http://localhost:3000/api/v1/resenas \
  -H "Content-Type: application/json" \
  -d '{"videojuego_id": 1, "calificacion": 5, "comentario": "Mundo abierto espectacular"}'
```

## Respuestas de error

Errores de validación (`400 Bad Request`):

```json
{
  "errores": [
    {
      "type": "field",
      "value": "xy",
      "msg": "El nombre debe tener entre 2 y 80 caracteres",
      "path": "nombre",
      "location": "body"
    }
  ]
}
```

| Código | Cuándo ocurre                                                 | Cuerpo                                  |
| ------ | ------------------------------------------------------------- | --------------------------------------- |
| `400`  | Datos inválidos, `:id` no válido o JSON mal formado           | `{ "errores": [...] }` o `{ "error": "..." }` |
| `404`  | El recurso (desarrolladora, videojuego o reseña) no existe    | `{ "error": "Videojuego no encontrado" }` |
| `404`  | La ruta no existe                                             | `{ "error": "Ruta no encontrada" }`     |
| `409`  | Se viola un valor único (por ejemplo, un nombre repetido)     | `{ "error": "..." }`                    |
| `500`  | Error interno del servidor                                    | `{ "error": "Error interno del servidor" }` |

## Scripts disponibles

| Comando       | Descripción                                          |
| ------------- | ---------------------------------------------------- |
| `npm start`   | Inicia el servidor                                   |
| `npm run dev` | Inicia el servidor y lo reinicia al detectar cambios |

## Documentación

Para aprender cómo funciona cada parte del proyecto, empieza por [`docs/README.md`](docs/README.md).

## Licencia

ISC. Autor: [Velasco-c](https://github.com/Velasco-c).
