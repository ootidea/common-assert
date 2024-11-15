export function assertTypeEquality<T, U>(..._: Equals<T, U> extends true ? [] : [error: 'Type does not match', T, U]) {}

type Equals<T, U> = (<R>() => R extends T ? 1 : 2) extends <R>() => R extends U ? 1 : 2 ? true : false
