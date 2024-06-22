import type {App} from '../App'
import type {IScene} from './IScene'

export class TitleScene implements IScene {
  private readonly app: App

  public constructor(app: App) {
    this.app = app
  }

  public update(): IScene {
    this.app.getRenderer().clear()
    this.app.getRenderer().drawString('Title Scene', 'center', 32, 0.5, 0.5, 1, 1, 1)
    if (this.app.getInputListener().get().length > 0) {
      console.log(this.app.getInputListener().get())
    }
    return this
  }
}
