import type {App} from '@/app/App'
import type {DifficultyInformation} from '@/app/game/DifficultyInformation'
import {Board} from '@/app/game/entity/Board'
import {Folio} from '@/app/game/entity/Folio'
import {Result} from '@/app/game/entity/Result'
import {Score} from '@/app/game/entity/Score'
import {Time} from '@/app/game/entity/Time'
import {QuestionManager} from '@/app/game/question/QuestionManager'
import {TypingManager} from '@/app/game/typing/TypingManager'

import type {ISubScene} from './ISubScene'
import {Ending} from './Ending'

export class Playing implements ISubScene {
  private readonly app: App
  private readonly difInfo: DifficultyInformation

  private readonly questionManager: QuestionManager
  private readonly typingManager: TypingManager

  private readonly board: Board
  private readonly folio: Folio
  private readonly result: Result
  private readonly score: Score
  private readonly time: Time

  public constructor(app: App, difInfo: DifficultyInformation) {
    this.app = app
    this.difInfo = difInfo
    this.questionManager = new QuestionManager(difInfo.questions, difInfo.min, difInfo.max)
    this.typingManager = new TypingManager(app)
    this.board = new Board(app, this.questionManager, difInfo.shouldShowCA)
    this.folio = new Folio(app, difInfo.questionsCount)
    this.time = new Time(app, this.questionManager)
    this.score = new Score(app, this.questionManager, this.time, 0)
    this.result = new Result(app, this.score)
  }

  public update(): ISubScene {
    // update objects
    this.time.update()
    const typingResult = this.typingManager.update()
    this.result.addKeysCount(typingResult.keysCount)

    // backspace penalty
    if (typingResult.isBackspaced) {
      this.result.incrementsBackspacesCount()
      this.score.halveBonusScore()
    }

    // time limit penalty
    if (this.difInfo.hasTimeLimit && this.time.isTimeUp()) {
      this.result.incrementsTimeupsCount()
      this.score.resetBonusScore()
      this.goToNextQuestion()
    }

    // check submittion
    if (this.typingManager.checkSubmitted()) {
      // correct
      if (this.questionManager.solve(this.typingManager.getBuffer().get())) {
        this.result.incrementsCorrectsCount()
        this.score.add()
        this.goToNextQuestion()
      }
      // incorrect
      else {
        this.result.incrementsIncorrectsCount()
        this.score.resetBonusScore()
        this.typingManager.reject()
      }
    }

    // check end
    if (this.folio.isEnded()) {
      this.result.endMeasure()
      return new Ending(this.app, this.result)
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
    this.folio.increment()
    this.questionManager.next()
    this.typingManager.clear()
    this.time.reset()
  }
}
