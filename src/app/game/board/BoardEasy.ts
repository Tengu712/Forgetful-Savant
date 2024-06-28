import type {App} from '@/app/App'
import type {IBoard} from './IBoard'
import type {QuestionManager} from '../question/QuestionManager'
import type {TypingBuffer} from '../typing/TypingBuffer'

export class BoardEasy implements IBoard {
  private readonly app: App
  private readonly questionManager: QuestionManager
  private readonly typingBuffer: TypingBuffer

  public constructor(app: App, questionManager: QuestionManager, typingBuffer: TypingBuffer) {
    this.app = app
    this.questionManager = questionManager
    this.typingBuffer = typingBuffer
  }

  public draw() {
    const [ca, m] = this.getCorrectAnswer()
    const renderer = this.app.getRenderer()
    renderer.drawString(this.questionManager.get().getText(), 'center', 20, 0.5, 0.25, 1, 1, 1)
    renderer.drawString(this.typingBuffer.get(), 'center', 18, 0.5, 0.4, 1, 1, 1)
    if (m) {
      renderer.drawString(ca, 'center', 18, 0.5, 0.35, 0.8, 0.8, 0.8)
    } else {
      renderer.drawString(ca, 'center', 18, 0.5, 0.35, 0.8, 0, 0)
    }
  }

  private getCorrectAnswer(): [string, boolean] {
    const answer = this.typingBuffer.getConfirmed()
    const cas = this.questionManager.get().getCorrectAnswers()
    for (const ca of cas) {
      if (ca.startsWith(answer)) {
        return [ca, true]
      }
    }
    return [cas[0], false]
  }
}
