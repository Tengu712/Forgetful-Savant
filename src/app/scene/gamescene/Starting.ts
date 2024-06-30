import type {App} from '@/app/App'
import type {DifficultyInformation} from '@/app/game/DifficultyInformation'

import type {ISubScene} from './ISubScene'
import {Playing} from './Playing'

export class Starting implements ISubScene {
  private readonly app: App
  private readonly difInfo: DifficultyInformation

  public constructor(app: App, difInfo: DifficultyInformation) {
    this.app = app
    this.difInfo = difInfo
  }

  public update(): ISubScene {
    return new Playing(this.app, this.difInfo)
  }

  public draw(): void {}
}
