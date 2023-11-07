/** Class representing a bad input error. */
class BadInputError extends Error {
  /**
     * create a bad input error
     *
     * @augments Error
     *
     * @param {Error} originalError - the original error
     */
  constructor(originalError) {
    super('Unprocessable entity');
    if (originalError) {
      this.originalError = originalError;
    }
    this.httpStatusCode = 422;
  }
}

export default BadInputError;
