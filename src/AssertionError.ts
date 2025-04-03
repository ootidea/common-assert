/** An error class that represents an assertion failure */
export class AssertionError extends Error {
  static {
    AssertionError.prototype.name = 'AssertionError'
  }
}
