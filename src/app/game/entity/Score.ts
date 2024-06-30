import type {App} from '@/app/App'
import type {QuestionManager} from '@/app/game/question/QuestionManager'

import type {Time} from './Time'

/**
 * スコアに関するオブジェクト
 *
 * - ボーナススコアとスコアを管理する
 * - ボーナススコアとスコアの描画を行う
 * - 問題と回答時間に従ってスコア計算を行う
 *
 * WARNING: 必ずスコア計算の後に問題と回答時間を更新する
 */
export class Score {
  private readonly app: App
  private readonly questionManager: QuestionManager
  private readonly time: Time
  private bonusScore: number
  private score: number

  public constructor(app: App, questionManager: QuestionManager, time: Time, initValue: number) {
    this.app = app
    this.questionManager = questionManager
    this.time = time
    this.bonusScore = 0
    this.score = initValue
  }

  public getAsString(): string {
    return this.score.toString().padStart(12, '0')
  }

  public add() {
    const addition = this.getScoreAddition()
    this.score += addition + this.bonusScore
    this.bonusScore += this.roundTrunc(addition * 0.1)
  }

  public halveBonusScore() {
    this.bonusScore = this.roundTrunc(this.bonusScore * 0.5)
  }

  public resetBonusScore() {
    this.bonusScore = 0
  }

  public draw() {
    const renderer = this.app.getRenderer()

    const a = this.getScoreAddition().toString()
    const b = this.bonusScore.toString()
    renderer.drawString(a + '+' + b, 'right', 14, 0.9, 0.2, 1, 1, 1)

    const s = this.getAsString()
    renderer.drawString(s, 'left', 16, 0.01, 0.1, 1, 1, 1)
  }

  private getScoreAddition(): number {
    const rawScore = this.questionManager.get().getScore()
    const timeRatio = this.time.getRatio()
    return this.roundTrunc(rawScore * (1 - 0.9 * timeRatio))
  }

  private roundTrunc(n: number): number {
    return Math.trunc(Math.round(n))
  }
}
