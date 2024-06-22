import type {IInputListener} from '@/app/input/IInputListener'

export class InputListener implements IInputListener {
  private buffer: string[]
  private previous: string[]

  public constructor() {
    this.buffer = []
    this.previous = []
    document.addEventListener('keydown', (event) => {
      this.buffer.push(event.key)
    })
  }

  public update() {
    this.previous = this.buffer
    this.buffer = []
  }

  public get(): readonly string[] {
    return this.previous
  }
}
