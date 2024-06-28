import {Question} from './Question'

export class QuestionManager {
  private readonly questions: Question[]
  private current: Question

  public constructor() {
    // TODO:
    this.questions = [
      new Question(
        '『坊ちゃん』や『こころ』の作者は？',
        ['なつめそうせき', 'なつめきんのすけ'],
        300,
        100000
      ),
    ]
    this.current = this.questions[0]
  }

  public get(): Question {
    return this.current
  }

  public next() {
    // TODO:
    this.current = this.questions[0]
  }
}
