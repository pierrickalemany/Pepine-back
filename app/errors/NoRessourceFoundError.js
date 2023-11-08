/** Class representing a no resource found error. */
class NoResourceFoundError extends Error {
  /**
     * create a no resource found error
     *
     * @augments Error
     */
  constructor() {
    super('404 No resource found');
    this.httpStatusCode = 404;
  }
}

export default NoResourceFoundError;
