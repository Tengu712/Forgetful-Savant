import type {ISubScene} from './gamescene/ISubScene'
import type {IScene} from './IScene'
import type {App} from '../App'
import type {DifficultyInformation} from '../game/DifficultyInformation'
import {Playing} from './gamescene/Playing'

export class GameScene implements IScene {
  private readonly app: App
  private subScene: ISubScene

  public constructor(app: App, difInfo: DifficultyInformation) {
    this.app = app
    this.subScene = new Playing(app, difInfo)
  }

  public update(): IScene {
    this.subScene = this.subScene.update()

    const renderer = this.app.getRenderer()
    renderer.clear()
    this.subScene.draw()

    return this
  }
}
