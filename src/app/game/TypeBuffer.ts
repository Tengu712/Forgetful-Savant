import type {App} from '../App'
import {TypingMap} from './TypingMap'

export class TypeBuffer {
  private readonly map: TypingMap
  private readonly app: App
  private buffer: string[]
  private isDisabled: boolean
  private isSubmitted: boolean

  public constructor(app: App) {
    this.map = new TypingMap()
    this.app = app
    this.buffer = []
    this.isDisabled = false
    this.isSubmitted = false
  }

  public update() {
    if (this.isDisabled || this.isSubmitted) {
      return
    }
    for (const c of this.app.getInputListener().get()) {
      if (c === 'Backspace') {
        this.buffer.pop()
        continue
      }
      if (c === 'Enter') {
        this.isSubmitted = true
        break
      }
      if (this.map.isAvailable(c)) {
        this.buffer.push(c)
        this.map.convert(this.buffer)
      }
    }
  }

  public disableTyping() {
    this.isDisabled = true
  }

  public enableTyping() {
    this.isDisabled = false
  }

  public reject() {
    this.isSubmitted = false
  }

  public clear() {
    this.buffer = []
    this.isSubmitted = false
  }

  public get(): string {
    return this.buffer.join('')
  }

  public getSubmission(): string | null {
    if (this.isSubmitted) {
      return this.buffer.join('')
    } else {
      return null
    }
  }
}
