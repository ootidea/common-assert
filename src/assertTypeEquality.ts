/**
 * Asserts that two types are strictly equal.
 * This function operates during type checking, not at runtime.
 * It results in a type error when the assertion fails.
 * It does nothing at runtime.
 * @example
 * assertTypeEquality<Uppercase<'a'>, 'A'>() // succeeds
 * @example
 * assertTypeEquality<any, never>() // fails as a type error
 */
export function assertTypeEquality<T, U>(..._: Equals<T, U> extends true ? [] : [error: 'Type does not match']) {}

type Equals<T, U> = (<R>() => R extends T ? 1 : 2) extends <R>() => R extends U ? 1 : 2 ? true : false

if (import.meta.vitest) {
  describe('assertTypeEquality function', () => {
    it('has no type error when two types are equal', () => {
      assertTypeEquality<number, number>()
      assertTypeEquality<boolean, true | false>()
      assertTypeEquality<Uppercase<'a'>, 'A'>()
    })

    it('has type error when two types are not equal', () => {
      // @ts-expect-error
      assertTypeEquality<string, string & {}>()
      // @ts-expect-error
      assertTypeEquality<any, unknown>()
      // @ts-expect-error
      assertTypeEquality<any, never>()
    })
  })
}
