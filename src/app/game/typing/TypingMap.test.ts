import {describe, expect, test} from 'bun:test'
import {TypingMap} from './TypingMap'

describe('TypingMap.convert()', () => {
  test('"a" to ["あ"]', () => {
    const map = new TypingMap()
    expect(map.convert('a')).toStrictEqual(['あ'])
  })

  test('"ki" to ["き"]', () => {
    const map = new TypingMap()
    expect(map.convert('ki')).toStrictEqual(['き'])
  })

  test('"cha" to ["ち", "ゃ"]', () => {
    const map = new TypingMap()
    expect(map.convert('cha')).toStrictEqual(['ち', 'ゃ'])
  })

  test('"xydu" to ["x", "y", "づ"]', () => {
    const map = new TypingMap()
    expect(map.convert('xydu')).toStrictEqual(['x', 'y', 'づ'])
  })

  test('"xyrye" to ["x", "y", "り", "ぇ"]', () => {
    const map = new TypingMap()
    expect(map.convert('xyrye')).toStrictEqual(['x', 'y', 'り', 'ぇ'])
  })
})
