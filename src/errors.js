class PageNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = "Page not found";
  }
}

class NotAuthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = "Not Authorized";
  }
}

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.name = "Bad Request";
  }
}

export { PageNotFound, NotAuthorized, BadRequest };
