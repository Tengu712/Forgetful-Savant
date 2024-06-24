import type {IScene} from './IScene'
import type {App} from '../App'
import {TypeBuffer} from '../game/TypeBuffer'

export class GameScene implements IScene {
  private readonly app: App
  private readonly buffer: TypeBuffer

  public constructor(app: App) {
    this.app = app
    this.buffer = new TypeBuffer(app)
  }

  public update(): IScene {
    this.buffer.update()

    this.app.getRenderer().clear()
    this.app.getRenderer().drawString(this.buffer.get(), 'center', 18, 0.5, 0.5, 1, 1, 1)
    return this
  }
}
