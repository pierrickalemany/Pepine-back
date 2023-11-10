/** Class representing a Unauthorized error. */
class UnauthorizedError extends Error {
  /**
         * create a Unauthorized error
         *
         * @augments Error
         *
         * @param {Error} originalError - the original error
         */
  constructor(originalError) {
    super('Unauthorized error: invalid credentials');
    if (originalError) {
      this.originalError = originalError;
    }
    this.httpStatusCode = 401;
  }
}

export default UnauthorizedError;
