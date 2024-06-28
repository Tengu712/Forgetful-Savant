import type {IScene} from './IScene'
import type {App} from '../App'
import {TypingManager} from '../game/typing/TypingManager'
import {DifficultyResponsives} from '../game/DifficultyResponsives'
import {BoardEasy} from '../game/board/BoardEasy'
import {QuestionManager} from '../game/question/QuestionManager'

export class GameScene implements IScene {
  private readonly app: App
  private readonly typingManager: TypingManager
  private readonly difResps: DifficultyResponsives

  // TODO: pass difficulty
  public constructor(app: App) {
    this.app = app
    this.typingManager = new TypingManager(app)

    const questionManager = new QuestionManager()
    const board = new BoardEasy(app, questionManager, this.typingManager.getBuffer())
    this.difResps = new DifficultyResponsives(questionManager, board)
  }

  public update(): IScene {
    this.typingManager.update()
    if (this.typingManager.checkSubmitted()) {
      if (this.difResps.getQuestionManager().get().solve(this.typingManager.getBuffer().get())) {
        // TODO: difficults
        // TODO: score
        console.log('correct!')
        this.typingManager.clear()
        this.difResps.getQuestionManager().next()
      } else {
        // TODO: difficults
        // TODO: score
        console.log('incorrect!')
        this.typingManager.reject()
      }
    }

    this.app.getRenderer().clear()
    this.difResps.getBoard().draw()
    return this
  }
}
