export class Question {
  private readonly text: string
  private readonly correctAnswers: readonly string[]
  private readonly timeLimit: number
  private readonly score: number

  public constructor(
    text: string,
    correctAnswers: readonly string[],
    timeLimit: number,
    score: number
  ) {
    this.text = text
    this.correctAnswers = correctAnswers
    this.timeLimit = timeLimit
    this.score = score
  }

  public solve(answer: string): boolean {
    return this.correctAnswers.includes(answer)
  }

  public getText(): string {
    return this.text
  }

  public getCorrectAnswers(): readonly string[] {
    return this.correctAnswers
  }

  public getTimeLimit(): number {
    return this.timeLimit
  }

  public getScore(): number {
    return this.score
  }
}
