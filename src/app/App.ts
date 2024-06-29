import {FpsMeasure} from './FpsMeasure'
import type {IRenderer} from './graphics/IRenderer'
import type {IInputListener} from './input/IInputListener'
import type {IScene} from './scene/IScene'
import {TitleScene} from './scene/TitleScene'

export class App {
  private readonly renderer: IRenderer
  private readonly inputListener: IInputListener
  private readonly fpsMeasure: FpsMeasure
  private scene: IScene
  private timeStamp: number

  public constructor(renderer: IRenderer, inputListener: IInputListener) {
    this.renderer = renderer
    this.inputListener = inputListener
    this.fpsMeasure = new FpsMeasure()
    this.scene = new TitleScene(this)
    this.timeStamp = 0
    this.onLooped = this.onLooped.bind(this)
  }

  public run() {
    requestAnimationFrame(this.onLooped)
  }

  private onLooped(timeStamp: number) {
    this.timeStamp = timeStamp
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

  public getTimeStamp(): number {
    return this.timeStamp
  }
}
