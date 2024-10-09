import type {App} from '../App'
import {DifficultySelectionScene} from './DifficultySelectionScene'
import type {IScene} from './IScene'

export class TitleScene implements IScene {
	private readonly app: App

	public constructor(app: App) {
		this.app = app
	}

	public update(): IScene {
		if (this.app.getInputListener().get().length > 0) {
			// TODO: go to the correct scene
			return new DifficultySelectionScene(this.app)
		}

		this.app.getRenderer().clear()
		this.app.getRenderer().drawString('Title Scene', 'center', 32, 0.5, 0.5, 1, 1, 1)
		return this
	}
}
