import type {App} from '@/app/App'
import type {DifficultyInformation} from '@/app/game/DifficultyInformation'
import {Board} from '@/app/game/entity/Board'
import {Folio} from '@/app/game/entity/Folio'
import {Score} from '@/app/game/entity/Score'
import {Time} from '@/app/game/entity/Time'
import {QuestionManager} from '@/app/game/question/QuestionManager'
import {TypingManager} from '@/app/game/typing/TypingManager'

import type {ISubScene} from './ISubScene'

export class Playing implements ISubScene {
  private readonly app: App
  private readonly difInfo: DifficultyInformation

  private readonly questionManager: QuestionManager
  private readonly typingManager: TypingManager

  private readonly board: Board
  private readonly folio: Folio
  private readonly score: Score
  private readonly time: Time

  private start: number

  public constructor(app: App, difInfo: DifficultyInformation) {
    this.app = app
    this.difInfo = difInfo
    this.questionManager = new QuestionManager()
    this.typingManager = new TypingManager(app)
    this.board = new Board(app, this.questionManager, difInfo.shouldShowCA)
    this.folio = new Folio(app, difInfo.questionsCount)
    this.time = new Time(app, this.questionManager)
    this.score = new Score(app, this.questionManager, this.time, 0)
    this.start = this.app.getTimeStamp()
  }

  public update(): ISubScene {
    // update objects
    this.time.update()
    const isBackspaced = this.typingManager.update()

    // backspace penalty
    if (isBackspaced) {
      this.score.halveBonusScore()
    }

    // time limit penalty
    if (this.difInfo.hasTimeLimit && this.time.isTimeUp()) {
      this.score.resetBonusScore()
      this.goToNextQuestion()
    }

    // check submittion
    if (this.typingManager.checkSubmitted()) {
      // correct
      if (this.questionManager.get().solve(this.typingManager.getBuffer().get())) {
        this.score.add()
        this.folio.increment()
        this.goToNextQuestion()
      }
      // incorrect
      else {
        this.score.resetBonusScore()
        this.typingManager.reject()
      }
    }

    return this
  }

  public draw(): void {
    this.board.draw(this.typingManager.getBuffer())
    this.folio.draw()
    this.score.draw()
    this.time.draw()
  }

  private goToNextQuestion() {
    this.questionManager.next()
    this.typingManager.clear()
    this.time.reset()
  }
}
