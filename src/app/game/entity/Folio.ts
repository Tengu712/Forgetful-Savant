import type {App} from '@/app/App'

/**
 * 問題数と問題番号に関するオブジェクト
 *
 * - 問題数を保持し・問題番号を管理する
 * - 問題番号をインクリメントする
 * - 問題数と問題番号を描画する
 */
export class Folio {
  private readonly app: App
  private readonly questionsCount: number
  private count: number

  public constructor(app: App, questionsCount: number) {
    this.app = app
    this.questionsCount = questionsCount
    this.count = 0
  }

  public increment() {
    this.count += 1
  }

  public get(): number {
    return this.count
  }

  public draw() {
    const s = (this.count + 1).toString() + '/' + this.questionsCount
    this.app.getRenderer().drawString(s, 'left', 14, 0.1, 0.2, 1, 1, 1)
  }
}
