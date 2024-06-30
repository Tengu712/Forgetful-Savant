import {describe, expect, test} from 'bun:test'
import {AsQuestions, type Question} from './Question'

describe('AsQuestions()', () => {
  test('if questions is undefined it throws an error.', () => {
    const questions = {
      foo: 'foo',
      bar: 1,
    }
    expect(() => AsQuestions(questions)).toThrow()
  })

  test('if questions is not array it throws an error.', () => {
    const questions = {
      questions: 'foo',
    }
    expect(() => AsQuestions(questions)).toThrow()
  })

  test('if t is undefined it throws an error.', () => {
    const questions = {
      questions: [
        {
          a: ['こたえ'],
          l: 300,
          s: 1000,
        },
      ],
    }
    expect(() => AsQuestions(questions)).toThrow()
  })

  test('if t is not string it throws an error.', () => {
    const questions = {
      questions: [
        {
          t: '問題文',
          a: ['こたえ'],
          l: 300,
          s: 1000,
        },
        {
          t: 12,
          a: ['こたえ'],
          l: 300,
          s: 1000,
        },
      ],
    }
    expect(() => AsQuestions(questions)).toThrow()
  })

  test('if a is undefined it throws an error.', () => {
    const questions = {
      questions: [
        {
          t: '問題文',
          l: 300,
          s: 1000,
        },
      ],
    }
    expect(() => AsQuestions(questions)).toThrow()
  })

  test('if a is not array it throws an error.', () => {
    const questions = {
      questions: [
        {
          t: '問題文',
          a: ['こたえ'],
          l: 300,
          s: 1000,
        },
        {
          t: '問題文',
          a: 1,
          l: 300,
          s: 1000,
        },
      ],
    }
    expect(() => AsQuestions(questions)).toThrow()
  })

  test('if the element of a is not string it throws an error.', () => {
    const questions = {
      questions: [
        {
          t: '問題文',
          a: ['こたえ', 0],
          l: 300,
          s: 1000,
        },
      ],
    }
    expect(() => AsQuestions(questions)).toThrow()
  })

  test('if l is undefined it throws an error.', () => {
    const questions = {
      questions: [
        {
          t: '問題文',
          a: ['こたえ'],
          s: 1000,
        },
      ],
    }
    expect(() => AsQuestions(questions)).toThrow()
  })

  test('if l is not number it throws an error.', () => {
    const questions = {
      questions: [
        {
          t: '問題文',
          a: ['こたえ'],
          l: 300,
          s: 1000,
        },
        {
          t: '問題文',
          a: ['こたえ'],
          l: 'foo',
          s: 1000,
        },
      ],
    }
    expect(() => AsQuestions(questions)).toThrow()
  })

  test('if s is undefined it throws an error.', () => {
    const questions = {
      questions: [
        {
          t: '問題文',
          a: ['こたえ'],
          l: 300,
        },
      ],
    }
    expect(() => AsQuestions(questions)).toThrow()
  })

  test('if s is not number it throws an error.', () => {
    const questions = {
      questions: [
        {
          t: '問題文',
          a: ['こたえ'],
          l: 300,
          s: 1000,
        },
        {
          t: '問題文',
          a: ['こたえ'],
          l: 300,
          s: {s: 1000},
        },
      ],
    }
    expect(() => AsQuestions(questions)).toThrow()
  })

  test('if it is correct it returns Question[].', () => {
    const questions = {
      questions: [
        {
          t: '問題文',
          a: ['こたえ'],
          l: 300,
          s: 1000,
        },
        {
          t: '問題文',
          a: ['こたえ'],
          l: 300,
          s: 1000,
        },
      ],
    }
    const expected: Question[] = [
      {
        t: '問題文',
        a: ['こたえ'],
        l: 300,
        s: 1000,
      },
      {
        t: '問題文',
        a: ['こたえ'],
        l: 300,
        s: 1000,
      },
    ]
    expect(AsQuestions(questions)).toStrictEqual(expected)
  })
})
