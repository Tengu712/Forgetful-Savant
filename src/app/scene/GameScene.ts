import type {IScene} from './IScene'
import type {App} from '../App'
import {DifficultyResponsives} from '../game/DifficultyResponsives'
import {Score} from '../game/Score'
import {BoardEasy} from '../game/board/BoardEasy'
import {QuestionManager} from '../game/question/QuestionManager'
import {TypingManager} from '../game/typing/TypingManager'

export class GameScene implements IScene {
  private readonly app: App
  private readonly score: Score
  private readonly typingManager: TypingManager
  private readonly difResps: DifficultyResponsives
  private bonusScore: number
  private count: number

  // TODO: pass difficulty
  public constructor(app: App) {
    this.app = app
    this.score = new Score(app, 0)
    this.typingManager = new TypingManager(app)
    this.bonusScore = 0
    this.count = 0

    const questionManager = new QuestionManager()
    const board = new BoardEasy(app, questionManager)
    this.difResps = new DifficultyResponsives(questionManager, board, true)
  }

  public update(): IScene {
    // update objects
    this.count += 1
    const isBackspaced = this.typingManager.update()

    // backspace penalty
    if (isBackspaced) {
      this.bonusScore = this.roundTrunc(this.bonusScore * 0.5)
    }

    // time limit penalty
    if (this.difResps.hasTimeLimit() && this.getTimeRatio() >= 1) {
      this.bonusScore = 0
      this.goToNextQuestion(false)
    }

    // check submittion
    if (this.typingManager.checkSubmitted()) {
      // if the answer is correct
      if (this.difResps.getQuestionManager().get().solve(this.typingManager.getBuffer().get())) {
        this.goToNextQuestion(true)
      }
      // incorrect answer penalty
      else {
        this.bonusScore = 0
        this.typingManager.reject()
      }
    }

    // draw entities
    const renderer = this.app.getRenderer()
    //   background
    this.app.getRenderer().clear()
    //   question board
    this.difResps.getBoard().draw(this.typingManager.getBuffer())
    //   score addition and bonus score
    const scoreAdditionString = this.getScoreAddition().toString()
    const bonusScoreString = this.bonusScore.toString()
    const sabsString = scoreAdditionString + '+' + bonusScoreString
    renderer.drawString(sabsString, 'right', 14, 0.9, 0.2, 1, 1, 1)
    //   time bar
    renderer.drawRect(0, 0.15, 1 - this.getTimeRatio(), 0.01, 1, 1, 1)
    //   score
    this.score.draw()
    return this
  }

  private goToNextQuestion(shouldAddScore: boolean) {
    if (shouldAddScore) {
      const scoreAddition = this.getScoreAddition()
      const bonusScoreAddition = this.roundTrunc(scoreAddition * 0.1)
      this.score.add(scoreAddition + this.bonusScore)
      this.bonusScore += bonusScoreAddition
    }
    this.count = 0
    this.typingManager.clear()
    this.difResps.getQuestionManager().next()
  }

  private getScoreAddition(): number {
    const question = this.difResps.getQuestionManager().get()
    const ratio = this.getTimeRatio()
    const scoreAddition = this.roundTrunc(question.getScore() * (1 - 0.9 * ratio))
    return scoreAddition
  }

  private getTimeRatio(): number {
    return Math.min(1, this.count / this.difResps.getQuestionManager().get().getTimeLimit())
  }

  private roundTrunc(n: number): number {
    return Math.trunc(Math.round(n))
  }
}
