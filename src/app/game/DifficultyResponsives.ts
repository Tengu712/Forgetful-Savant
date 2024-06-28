import type {IBoard} from './board/IBoard'
import type {QuestionManager} from './question/QuestionManager'

export class DifficultyResponsives {
  private readonly questionManager: QuestionManager
  private readonly board: IBoard

  public constructor(questionManager: QuestionManager, board: IBoard) {
    this.questionManager = questionManager
    this.board = board
  }

  public getQuestionManager(): QuestionManager {
    return this.questionManager
  }

  public getBoard(): IBoard {
    return this.board
  }
}
