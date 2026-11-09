class PageNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = "Page not found";
  }
}

export { PageNotFound };
