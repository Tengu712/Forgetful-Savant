import {TypingMap} from './TypingMap'

export class TypingBuffer {
  private readonly map: TypingMap
  private confirmed: string[]
  private pending: string[]

  public constructor() {
    this.map = new TypingMap()
    this.confirmed = []
    this.pending = []
  }

  // TODO: cache
  public get(): string {
    return this.getConfirmed() + this.getPending()
  }

  // TODO: cache
  public getConfirmed(): string {
    return this.confirmed.join('')
  }

  // TODO: cache
  public getPending(): string {
    return this.pending.join('')
  }

  public clear() {
    this.confirmed = []
    this.pending = []
  }

  public pop() {
    if (this.pending.length > 0) {
      this.pending.pop()
    } else {
      this.confirmed.pop()
    }
  }

  public push(c: string) {
    if (!this.map.isAvailable(c)) {
      return
    }
    this.pending.push(c)
    const newConfirmed = this.map.convert(this.getPending())
    if (newConfirmed.length > 0) {
      this.confirmed = this.confirmed.concat(newConfirmed)
      this.pending = []
    }
  }
}
