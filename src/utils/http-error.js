export class HttpError extends Error {
  constructor(status, mensaje) {
    super(mensaje);
    this.name = "HttpError";
    this.status = status;
  }
}
