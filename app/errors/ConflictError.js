/** Class representing a conflict error. */
class ConflictError extends Error {
  /**
       * create a conflcit error
       *
       * @augments Error
       *
       * @param {Error} originalError - the original error
       */
  constructor(originalError) {
    super('Conflict error: already exists or other resources depend on it');
    if (originalError) {
      this.originalError = originalError;
    }
    this.httpStatusCode = 409;
  }
}

export default ConflictError;
