import { expect } from 'vitest'
import { AssertionError } from './AssertionError'
import { assertTypeEquality } from './assertTypeEquality'

/**
 * Asserts that the value is not undefined.
 * @param value - The value to check
 * @throws AssertionError if the value is undefined
 * @example
 * const value = 'a' as string | undefined
 * assertNonUndefined(value) // succeeds
 * console.log(value.length) // value is narrowed to string
 * @example
 * assertNonUndefined(undefined) // throws AssertionError: The value is undefined
 */
export function assertNonUndefined<T>(value: T | undefined): asserts value is T {
  if (value === undefined) {
    throw new AssertionError('The value is undefined')
  }
}

if (import.meta.vitest) {
  describe('assertNonUndefined function', () => {
    it('narrows variable type to non-undefined type', () => {
      const value = 'a' as string | undefined
      assertTypeEquality<typeof value, string | undefined>()
      assertNonUndefined(value)
      assertTypeEquality<typeof value, string>()
    })

    it('throws an error if the value is undefined', () => {
      expect(() => assertNonUndefined(undefined)).toThrow(/^The value is undefined$/)
    })
  })
}
