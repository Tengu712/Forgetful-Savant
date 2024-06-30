import type {App} from '@/app/App'
import type {DifficultyInformation} from '@/app/game/DifficultyInformation'

import {GameScene} from './GameScene'
import type {IScene} from './IScene'
import {TitleScene} from './TitleScene'

enum State {
  Difficulty,
  Restriction,
}

const DIFFICULTIES = [
  {
    name: '簡潔明瞭',
    desc: 'キーボードを打ち始めて間もない人向け',
    max: 750000,
    min: 100000,
  },
  {
    name: '平談俗語',
    desc: 'キーボード入力も知識量も一般的な人向け',
    max: 1250000,
    min: 500000,
  },
  {
    name: '詰屈聱牙',
    desc: '少し歯ごたえが欲しい人向け',
    max: 2500000,
    min: 1000000,
  },
  {
    name: '槃根錯節',
    desc: '速筆サヴァン向け',
    max: Number.MAX_VALUE,
    min: 2000000,
  },
]

const RESTRICTIONS = [
  {
    name: '平穏無事',
    desc: '',
  },
  {
    name: '多事多端',
    desc: '制限時間あり',
  },
  {
    name: '徙家亡妻',
    desc: '正答表示なし',
  },
  {
    name: '雪上加霜',
    desc: '制限時間あり・正答表示なし',
  },
]

export class DifficultySelectionScene implements IScene {
  private readonly app: App
  private state: State
  private difCursor: number
  private resCursor: number

  public constructor(app: App) {
    this.app = app
    this.state = State.Difficulty
    this.difCursor = 1
    this.resCursor = 3
  }

  public update(): IScene {
    const inputs = this.app.getInputListener().get()
    const d = inputs.includes('ArrowDown') || inputs.includes('j')
    const u = inputs.includes('ArrowUp') || inputs.includes('k')
    const e = inputs.includes('Enter') || inputs.includes('z')
    const b = inputs.includes('Backspace') || inputs.includes('x')
    const next =
      this.state === State.Difficulty
        ? this.updateDifficulty(d, u, e, b)
        : this.updateRestriction(d, u, e, b)

    this.app.getRenderer().clear()
    this.app.getRenderer().drawString('Difficulty Selection Scene', 'center', 32, 0.5, 0.5, 1, 1, 1)
    return next
  }

  private updateDifficulty(d: boolean, u: boolean, e: boolean, b: boolean): IScene {
    if (d) {
      this.difCursor = (this.difCursor + 1) % DIFFICULTIES.length
    }
    if (u) {
      this.difCursor = (this.difCursor + DIFFICULTIES.length - 1) % DIFFICULTIES.length
    }
    if (e) {
      this.state = State.Restriction
    }
    if (b) {
      return new TitleScene(this.app)
    }
    return this
  }

  private updateRestriction(d: boolean, u: boolean, e: boolean, b: boolean): IScene {
    if (d) {
      this.resCursor = (this.resCursor + 1) % RESTRICTIONS.length
    }
    if (u) {
      this.resCursor = (this.resCursor + RESTRICTIONS.length - 1) % RESTRICTIONS.length
    }
    if (b) {
      this.state = State.Difficulty
    }
    if (e) {
      const questionsCount = this.difCursor === 0 ? 15 : 30
      const shouldShowCA = this.resCursor === 0 || this.resCursor === 1
      const hasTimeLimit = this.resCursor === 1 || this.resCursor === 3
      const difInfo: DifficultyInformation = {
        questions: this.app.getQuestions(),
        max: DIFFICULTIES[this.difCursor].max,
        min: DIFFICULTIES[this.difCursor].min,
        questionsCount: questionsCount,
        shouldShowCA: shouldShowCA,
        hasTimeLimit: hasTimeLimit,
      }
      return new GameScene(this.app, difInfo)
    }
    return this
  }
}
