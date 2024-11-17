import { AssertionError } from './AssertionError'
import { assertTypeEquality } from './assertTypeEquality'

/**
 * Asserts that the value is an instance of the given class.
 * @param value - The value to check
 * @param ctor - The constructor function
 * @throws AssertionError if the value is not an instance of the given class
 * @example
 * const value: unknown = new Blob()
 * assertInstanceOf(value, Blob) // succeeds
 * console.log(value.size) // value is narrowed to Blob
 * @example
 * assertInstanceOf(null, URL) // throws AssertionError: The null is not an instance of URL
 */
export function assertInstanceOf<T extends abstract new (..._: any) => any>(
  value: unknown,
  ctor: T,
): asserts value is InstanceType<T> {
  if (!(value instanceof ctor)) {
    throw new AssertionError(`The ${value} is not an instance of ${ctor.name}`)
  }
}

if (import.meta.vitest) {
  describe('assert function', () => {
    it('narrows variable type to the given class type', () => {
      const value: unknown = new Blob()
      assertTypeEquality<typeof value, unknown>()
      assertInstanceOf(value, Blob)
      assertTypeEquality<typeof value, Blob>()
    })

    it('throws an error if the value is not an instance of the given class', () => {
      expect(() => assertInstanceOf(null, URL)).toThrow(/^The null is not an instance of URL$/)

      expect(() => assertInstanceOf(0, Number)).toThrow(/^The 0 is not an instance of Number$/)
    })
  })
}
