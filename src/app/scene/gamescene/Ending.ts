import type {App} from '@/app/App'
import type {Result} from '@/app/game/entity/Result'

import type {ISubScene} from './ISubScene'

export class Ending implements ISubScene {
  private readonly app: App
  private readonly result: Result

  public constructor(app: App, result: Result) {
    this.app = app
    this.result = result
  }

  public update(): ISubScene {
    return this
  }

  public draw(): void {
    this.result.draw()
  }
}
