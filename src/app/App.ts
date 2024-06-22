import {FpsMeasure} from './FpsMeasure'
import type {IRenderer} from './graphics/IRenderer'
import type {IInputListener} from './input/IInputListener'
import type {IScene} from './scene/IScene'
import {TitleScene} from './scene/TitleScene'

export class App {
  private scene: IScene
  private readonly renderer: IRenderer
  private readonly inputListener: IInputListener
  private readonly fpsMeasure: FpsMeasure

  public constructor(renderer: IRenderer, inputListener: IInputListener) {
    this.renderer = renderer
    this.inputListener = inputListener
    this.fpsMeasure = new FpsMeasure()
    this.scene = new TitleScene(this)
    this.onLooped = this.onLooped.bind(this)
  }

  public run() {
    requestAnimationFrame(this.onLooped)
  }

  private onLooped(timeStamp: number) {
    this.fpsMeasure.update(timeStamp)
    this.inputListener.update()
    this.scene = this.scene.update()
    this.renderer.drawString(this.fpsMeasure.getString(), 'right', 20, 0.99, 0.98, 1, 1, 1)
    requestAnimationFrame(this.onLooped)
  }

  public getRenderer(): IRenderer {
    return this.renderer
  }

  public getInputListener(): IInputListener {
    return this.inputListener
  }
}
