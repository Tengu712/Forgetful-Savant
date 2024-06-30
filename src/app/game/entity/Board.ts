import type {App} from '@/app/App'
import type {QuestionManager} from '@/app/game/question/QuestionManager'
import type {TypingBuffer} from '@/app/game/typing/TypingBuffer'

/**
 * 問題文と回答の描画に関するオブジェクト
 *
 * - 問題文と回答を描画する
 * - 正答を描画する (設定次第)
 */
export class Board {
  private readonly app: App
  private readonly questionManager: QuestionManager
  private readonly shouldShowCA: boolean

  public constructor(app: App, questionManager: QuestionManager, shouldShowCA: boolean) {
    this.app = app
    this.questionManager = questionManager
    this.shouldShowCA = shouldShowCA
  }

  public draw(typingBuffer: TypingBuffer) {
    if (this.shouldShowCA) {
      this.drawWithCA(typingBuffer)
    } else {
      this.drawWithoutCA(typingBuffer)
    }
  }

  private drawWithoutCA(typingBuffer: TypingBuffer) {
    const renderer = this.app.getRenderer()
    renderer.drawString(this.questionManager.get().t, 'center', 20, 0.5, 0.25, 1, 1, 1)
    renderer.drawString(typingBuffer.get(), 'center', 18, 0.5, 0.4, 1, 1, 1)
  }

  private drawWithCA(typingBuffer: TypingBuffer) {
    const [ca, m] = this.getCorrectAnswer(typingBuffer)
    const renderer = this.app.getRenderer()
    renderer.drawString(this.questionManager.get().t, 'center', 20, 0.5, 0.25, 1, 1, 1)
    renderer.drawString(typingBuffer.get(), 'center', 18, 0.5, 0.4, 1, 1, 1)
    if (m) {
      renderer.drawString(ca, 'center', 18, 0.5, 0.35, 0.8, 0.8, 0.8)
    } else {
      renderer.drawString(ca, 'center', 18, 0.5, 0.35, 0.8, 0, 0)
    }
  }

  private getCorrectAnswer(typingBuffer: TypingBuffer): [string, boolean] {
    const answer = typingBuffer.getConfirmed()
    const cas = this.questionManager.get().a
    for (const ca of cas) {
      if (ca.startsWith(answer)) {
        return [ca, true]
      }
    }
    // TODO: return nearest correct answer
    return [cas[0], false]
  }
}
