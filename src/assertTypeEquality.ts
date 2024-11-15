export function assertTypeEquality<T, U>(..._: Equals<T, U> extends true ? [] : [error: 'Type does not match', T, U]) {}

type Equals<T, U> = (<R>() => R extends T ? 1 : 2) extends <R>() => R extends U ? 1 : 2 ? true : false

if (import.meta.vitest) {
  describe('assertTypeEquality function', () => {
    it('has no type error when two types are equal', () => {
      assertTypeEquality<number, number>()
      assertTypeEquality<boolean, true | false>()
    })

    it('has type error when two types are not equal', () => {
      // @ts-expect-error
      assertTypeEquality<string, number>()
      // @ts-expect-error
      assertTypeEquality<any, unknown>()
      // @ts-expect-error
      assertTypeEquality<any, never>()
    })
  })
}
