import type {App} from '@/app/App'
import type {QuestionManager} from '@/app/game/question/QuestionManager'

const TIME_LIMIT = 300

/**
 * 回答時間に関するオブジェクト
 *
 * - 現在時刻を管理する
 * - 現在時刻をインクリメントする
 * - 現在時刻をリセットする
 * - タイムバーを描画する
 */
export class Time {
  private readonly app: App
  private count: number

  public constructor(app: App) {
    this.app = app
    this.count = 0
  }

  public isTimeUp(): boolean {
    return this.count >= TIME_LIMIT
  }

  public getRatio(): number {
    return Math.min(1, this.count / TIME_LIMIT)
  }

  public reset() {
    this.count = 0
  }

  public update() {
    this.count += 1
  }

  public draw() {
    this.app.getRenderer().drawRect(0, 0.15, 1 - this.getRatio(), 0.01, 1, 1, 1)
  }
}
