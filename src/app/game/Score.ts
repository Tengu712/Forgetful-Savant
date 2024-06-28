import type {App} from '../App'

export class Score {
  private readonly app: App
  private score: number

  public constructor(app: App, initValue: number) {
    this.app = app
    this.score = initValue
  }

  public add(value: number) {
    this.score += value
  }

  public draw() {
    const s = this.score.toString().padStart(12, '0')
    this.app.getRenderer().drawString(s, 'left', 16, 0.01, 0.1, 1, 1, 1)
  }
}
