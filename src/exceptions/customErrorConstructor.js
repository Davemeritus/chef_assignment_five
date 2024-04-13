// Define a custom error class that extends the standard Error class
export class ErrorWithStatusCode extends Error {
    /**
     * Constructs a new ErrorWithStatusCode instance.
     * @param {string} message - The error message.
     * @param {number} statusCode - The HTTP status code associated with this error.
     */
    constructor(message, statusCode) {
      super(message); // Call the constructor of the base Error class with the message
      this.statusCode = statusCode; // Assign the HTTP status code as a property of the instance
    }
  }
  