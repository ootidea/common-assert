import { expect } from 'vitest'
import { AssertionError } from './AssertionError'
import { assertTypeEquality } from './assertTypeEquality'

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
