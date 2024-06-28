export class Question {
  private readonly text: string
  private readonly correctAnswers: readonly string[]

  public constructor(text: string, correctAnswers: readonly string[]) {
    this.text = text
    this.correctAnswers = correctAnswers
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
}
