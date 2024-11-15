import { AssertionError } from './AssertionError'
import { assertTypeEquality } from './assertTypeEquality'
import { literalToString } from './literalToString'

export function assert<T, U extends T>(value: T, predicate: (value: T) => value is U): asserts value is U
export function assert<T>(value: T, predicate: (value: T) => false): never
export function assert<T>(value: T, predicate: (value: T) => boolean): void
export function assert<T>(value: T, predicate: (value: T) => boolean) {
  if (!predicate(value)) {
    const errorMessage = `The value ${literalToString(value)} does not satisfy the predicate ${predicate.name ? predicate.name : predicate}`

    throw new AssertionError(errorMessage)
  }
}

if (import.meta.vitest) {
  describe('assert function', () => {
    it('narrows variable type with given type guard function', () => {
      const n = 0 as number
      assertTypeEquality<typeof n, number>()
      assert(n, (value) => value === 0)
      assertTypeEquality<typeof n, 0>()
    })

    it('throws an error if the predicate returns false', () => {
      expect(() => assert(0, Number.isNaN)).toThrow(/^The value 0 does not satisfy the predicate isNaN$/)

      expect(() => assert(0, (n) => n === 1)).toThrow(/^The value 0 does not satisfy the predicate \(n\) => n === 1$/)
    })
  })
}
