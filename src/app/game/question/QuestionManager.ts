import type {Question} from './Question'

/**
 * 出題する問題に関するオブジェクト
 *
 * - 出題する問題を保持する
 * - 正誤判定を行う
 * - 次の問題へ移る
 */
export class QuestionManager {
  private readonly questions: readonly Question[]
  private readonly indexSet: Set<number>
  private current: Question

  public constructor(source: readonly Question[], min: number, max: number) {
    const questions = []
    for (const n of source) {
      if (n.s >= min && n.s <= max) {
        questions.push(n)
      }
    }
    if (questions.length === 0) {
      alert('No question is selected.')
      throw new Error('No question is selected.')
    }
    this.questions = questions
    this.indexSet = new Set()
    this.current = this.questions[0]
    this.next()
  }

  public solve(answer: string): boolean {
    return this.current.a.includes(answer)
  }

  public get(): Question {
    return this.current
  }

  public next() {
    if (this.indexSet.size === this.questions.length) {
      this.indexSet.clear()
    }
    let idx = Math.trunc(Math.random() * this.questions.length)
    while (true) {
      if (!this.indexSet.has(idx)) {
        this.indexSet.add(idx)
        this.current = this.questions[idx]
        break
      }
      idx = (idx + 1) % this.questions.length
    }
  }
}
