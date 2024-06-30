import type {App} from '@/app/App'
import type {DifficultyInformation} from '@/app/game/DifficultyInformation'

import type {ISubScene} from './gamescene/ISubScene'
import {Starting} from './gamescene/Starting'
import type {IScene} from './IScene'

export class GameScene implements IScene {
  private readonly app: App
  private subScene: ISubScene

  public constructor(app: App, difInfo: DifficultyInformation) {
    this.app = app
    this.subScene = new Starting(app, difInfo)
  }

  public update(): IScene {
    this.subScene = this.subScene.update()

    const renderer = this.app.getRenderer()
    renderer.clear()
    this.subScene.draw()

    return this
  }
}
