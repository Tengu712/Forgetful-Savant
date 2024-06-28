import type {IBoard} from './board/IBoard'
import type {QuestionManager} from './question/QuestionManager'

export class DifficultyResponsives {
  private readonly questionManager: QuestionManager
  private readonly board: IBoard
  private readonly timeLimit: boolean

  public constructor(questionManager: QuestionManager, board: IBoard, timeLimit: boolean) {
    this.questionManager = questionManager
    this.board = board
    this.timeLimit = timeLimit
  }

  public getQuestionManager(): QuestionManager {
    return this.questionManager
  }

  public getBoard(): IBoard {
    return this.board
  }

  public hasTimeLimit(): boolean {
    return this.timeLimit
  }
}
