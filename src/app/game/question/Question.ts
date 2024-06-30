export type Question = {
  readonly t: string
  readonly a: readonly string[]
  readonly l: number
  readonly s: number
}

export function AsQuestions(source: any): readonly Question[] {
  function checkDefined(n: any, m: string, a: string) {
    if (n === undefined) {
      const s = '`' + m + '` is undefined.\n' + a
      throw new Error(s)
    }
  }
  function checkArray(n: any, m: string, a: string) {
    checkDefined(n, m, a)
    if (!Array.isArray(n)) {
      const s = '`' + m + '` is not array.\n' + a
      throw new Error(s)
    }
  }
  function checkString(n: any, m: string, a: string) {
    checkDefined(n, m, a)
    if (typeof n !== 'string') {
      const s = 'The type of `' + m + '` is not string.\n' + a
      throw new Error(s)
    }
  }
  function checkNumber(n: any, m: string, a: string) {
    checkDefined(n, m, a)
    if (typeof n !== 'number') {
      const s = 'The type of `' + m + '` is not number.\n' + a
      throw new Error(s)
    }
  }

  checkArray(source.questions, 'questions', '')
  for (const n of source.questions) {
    checkString(n.t, 't', '')
    checkArray(n.a, 'a', n.t)
    for (let i = 0; i < n.a.length; ++i) {
      checkString(n.a[i], 'a[' + i + ']', n.t)
    }
    checkNumber(n.l, 'l', n.t)
    checkNumber(n.s, 's', n.t)
  }
  return source.questions as Question[]
}
