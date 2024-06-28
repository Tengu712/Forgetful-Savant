import type {App} from '@/app/App'
import {TypingBuffer} from './TypingBuffer'

export class TypingManager {
  private readonly app: App
  private readonly buffer: TypingBuffer
  private isSubmitted: boolean

  public constructor(app: App) {
    this.app = app
    this.buffer = new TypingBuffer()
    this.isSubmitted = false
  }

  public update(): boolean {
    if (this.isSubmitted) {
      return false
    }
    let isBackspaced = false
    for (const c of this.app.getInputListener().get()) {
      if (c === 'Backspace') {
        isBackspaced = true
        this.buffer.pop()
        continue
      }
      if (c === 'Enter') {
        this.isSubmitted = true
        break
      }
      this.buffer.push(c)
    }
    return isBackspaced
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
