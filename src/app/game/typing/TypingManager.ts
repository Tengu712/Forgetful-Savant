import type {App} from '@/app/App'

import {TypingBuffer} from './TypingBuffer'
import type {TypingResult} from './TypingResult'

/**
 * TypingBufferを制御するオブジェクト
 *
 * - IInputListenerからTypingBufferへ入力情報を流す
 * - Backspaceで一文字消す
 * - Enterで提出状態に移行する
 */
export class TypingManager {
	private readonly app: App
	private readonly buffer: TypingBuffer
	private isSubmitted: boolean

	public constructor(app: App) {
		this.app = app
		this.buffer = new TypingBuffer()
		this.isSubmitted = false
	}

	public update(): TypingResult {
		let keysCount = 0
		let isBackspaced = false
		for (const c of this.app.getInputListener().get()) {
			keysCount += 1
			if (c === 'Backspace') {
				isBackspaced = true
				this.buffer.pop()
			} else if (c === 'Enter') {
				this.isSubmitted = true
			} else {
				this.buffer.push(c)
			}
		}
		return {
			keysCount: keysCount,
			isBackspaced: isBackspaced,
		}
	}

	public reject() {
		this.isSubmitted = false
	}

	public clear() {
		this.buffer.clear()
		this.isSubmitted = false
	}

	public getBuffer(): TypingBuffer {
		return this.buffer
	}

	public checkSubmitted(): boolean {
		return this.isSubmitted
	}
}
