import { AssertionError } from './AssertionError'
import { literalToString } from './literalToString'

export function assertNeverType(mustBeNeverType: never): never {
  throw new AssertionError(`The value ${literalToString(mustBeNeverType)} is not never type.`)
}

if (import.meta.vitest) {
  describe('assertNeverType function', () => {
    it('has no type error when the value is never type', () => {
      const value = 'a'
      switch (value) {
        case 'a':
          break
        default:
          assertNeverType(value)
      }
    })

    it('has type error when the value is not never type', () => {
      const value: string = 'a'
      switch (value) {
        case 'a':
          break
        default:
          // @ts-expect-error
          assertNeverType(value)
      }
    })

    it('throws an error when called', () => {
      const value = undefined as never
      expect(() => assertNeverType(value)).toThrow(/^The value undefined is not never type\.$/)
    })
  })
}
