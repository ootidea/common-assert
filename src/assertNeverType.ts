export function assertNeverType(mustBeNeverType: never): never {
  throw new Error(`Assertion failed: value ${mustBeNeverType} is not never type.`)
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
      expect(() => assertNeverType(value)).toThrow(/^Assertion failed: value undefined is not never type\.$/)
    })
  })
}
