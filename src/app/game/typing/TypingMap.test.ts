import {describe, expect, test} from 'bun:test'
import {TypingMap} from './TypingMap'

describe('TypingMap.convert()', () => {
	test('"a" to ["あ"]', () => {
		const map = new TypingMap()
		expect(map.convert('a')).toStrictEqual([['あ'], null])
	})

	test('"ki" to ["き"]', () => {
		const map = new TypingMap()
		expect(map.convert('ki')).toStrictEqual([['き'], null])
	})

	test('"cha" to ["ち", "ゃ"]', () => {
		const map = new TypingMap()
		expect(map.convert('cha')).toStrictEqual([['ち', 'ゃ'], null])
	})

	test('"xydu" to ["x", "y", "づ"]', () => {
		const map = new TypingMap()
		expect(map.convert('xydu')).toStrictEqual([['x', 'y', 'づ'], null])
	})

	test('"xyrye" to ["x", "y", "り", "ぇ"]', () => {
		const map = new TypingMap()
		expect(map.convert('xyrye')).toStrictEqual([['x', 'y', 'り', 'ぇ'], null])
	})

	test('"xyrye" to ["x", "y", "z", "z"]', () => {
		const map = new TypingMap()
		expect(map.convert('xyzz')).toStrictEqual([['x', 'y', 'っ'], 'z'])
	})
})
