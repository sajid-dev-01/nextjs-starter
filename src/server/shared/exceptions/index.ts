export class HttpError extends Error {
  public statusCode = 400;

  constructor(message = "Bad Request", options?: ErrorOptions) {
    super(message, options);
    this.name = "ApplicationError";
  }
}

export class AuthenticationError extends HttpError {
  constructor() {
    super("You must be logged in to view this content");
    this.name = "AuthenticationError";
    // this.statusCode = HttpStatusCode.Unauthorized;
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
    // this.statusCode = HttpStatusCode.NotFound;
  }
}

export class ValidationError extends HttpError {
  public fieldErrors: Record<string, string[] | undefined>;

  constructor(
    fieldErrors: Record<string, string[] | undefined>,
    message = "Validation failed!",
    options?: ErrorOptions
  ) {
    super(message, options);
    this.name = "ValidationError";
    this.fieldErrors = fieldErrors;
    // this.statusCode = HttpStatusCode.BadRequest;
  }
}
