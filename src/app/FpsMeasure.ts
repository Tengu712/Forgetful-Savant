export class FpsMeasure {
	private previous: number
	private fps: number

	public constructor() {
		this.previous = 0
		this.fps = 0
	}

	public update(timeStamp: number) {
		const distance = timeStamp - this.previous
		if (distance <= 0) {
			this.fps = 0
		} else {
			this.fps = (1 / distance) * 1000
		}
		this.previous = timeStamp
	}

	public getString(): string {
		return this.fps.toFixed(1) + 'fps'
	}
}
