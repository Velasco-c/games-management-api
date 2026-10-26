DROP DATABASE IF EXISTS games_api;
CREATE DATABASE games_api CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE games_api;

-- Tabla 1: desarrolladoras (estudios que crean los videojuegos)
CREATE TABLE desarrolladoras (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(80) NOT NULL UNIQUE,
    pais VARCHAR(60) NOT NULL,
    anio_fundacion SMALLINT UNSIGNED NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla 2: videojuegos (cada juego pertenece a una desarrolladora)
CREATE TABLE videojuegos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    plataforma ENUM('PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Móvil') NOT NULL,
    genero ENUM('Acción', 'Aventura', 'RPG', 'Estrategia', 'Deportes', 'Terror', 'Puzzle') NOT NULL,
    anio_lanzamiento SMALLINT UNSIGNED NOT NULL,
    estado ENUM('pendiente', 'jugando', 'completado', 'abandonado') NOT NULL DEFAULT 'pendiente',
    desarrolladora_id INT UNSIGNED NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_videojuegos_desarrolladora
        FOREIGN KEY (desarrolladora_id) REFERENCES desarrolladoras (id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    INDEX idx_videojuegos_estado (estado),
    INDEX idx_videojuegos_genero (genero)
);

-- Tabla 3: resenas (cada reseña pertenece a un videojuego)
CREATE TABLE resenas (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    videojuego_id INT UNSIGNED NOT NULL,
    calificacion TINYINT UNSIGNED NOT NULL,
    comentario VARCHAR(500) NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT chk_resenas_calificacion CHECK (calificacion BETWEEN 1 AND 5),
    CONSTRAINT fk_resenas_videojuego
        FOREIGN KEY (videojuego_id) REFERENCES videojuegos (id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_resenas_videojuego (videojuego_id)
);
