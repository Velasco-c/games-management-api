import express from "express";
import desarrolladoraRouter from "./routes/desarrolladora.routes.js";
import videojuegoRouter from "./routes/videojuego.routes.js";
import resenaRouter from "./routes/resena.routes.js";
import { manejarError, rutaNoEncontrada } from "./middlewares/error.middleware.js";

const API_VERSION = "1.0.0";
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.set("X-API-Version", API_VERSION);
  next();
});

app.get("/health", (req, res) => {
  res.status(200).json({ estado: "ok", version: API_VERSION });
});

app.use("/api/v1/desarrolladoras", desarrolladoraRouter);
app.use("/api/v1/videojuegos", videojuegoRouter);
app.use("/api/v1/resenas", resenaRouter);

app.use(rutaNoEncontrada);
app.use(manejarError);

export default app;
