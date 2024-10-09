import type {App} from '@/app/App'

import type {Score} from './Score'

/**
 * ゲームの結果に関するオブジェクト
 *
 * - 各情報を保持する
 * - 描画する
 *
 * WARNING: コンストラクタで時間計測開始、endMeasure()で時間計測終了
 */
export class Result {
	private readonly app: App
	private readonly score: Score
	private readonly start: number
	private end: number | null
	private keysCount: number
	private correctsCount: number
	private incorrectsCount: number
	private timeupsCount: number
	private backspacesCount: number

	public constructor(app: App, score: Score) {
		this.app = app
		this.score = score
		this.start = this.app.getTimeStamp()
		this.end = null
		this.keysCount = 0
		this.correctsCount = 0
		this.incorrectsCount = 0
		this.timeupsCount = 0
		this.backspacesCount = 0
	}

	public endMeasure() {
		this.end = this.app.getTimeStamp()
	}

	public addKeysCount(n: number) {
		this.keysCount += n
	}

	public incrementsCorrectsCount() {
		this.correctsCount += 1
	}

	public incrementsIncorrectsCount() {
		this.incorrectsCount += 1
	}

	public incrementsTimeupsCount() {
		this.timeupsCount += 1
	}

	public incrementsBackspacesCount() {
		this.backspacesCount += 1
	}

	public draw() {
		const renderer = this.app.getRenderer()
		renderer.drawString(this.score.getAsString(), 'left', 18, 0.1, 0.2, 1, 1, 1)
		renderer.drawString(this.keysCount.toString(), 'left', 16, 0.1, 0.25, 1, 1, 1)
		renderer.drawString(this.getKPS(), 'left', 16, 0.1, 0.3, 1, 1, 1)
		renderer.drawString(this.correctsCount.toString(), 'left', 16, 0.1, 0.35, 1, 1, 1)
		renderer.drawString(this.incorrectsCount.toString(), 'left', 16, 0.1, 0.4, 1, 1, 1)
		renderer.drawString(this.timeupsCount.toString(), 'left', 16, 0.1, 0.45, 1, 1, 1)
		renderer.drawString(this.backspacesCount.toString(), 'left', 16, 0.1, 0.5, 1, 1, 1)
	}

	private getKPS(): string {
		if (this.end === null) {
			return ''
		}
		const ms = this.end - this.start
		const s = ms / 1000
		const kps = this.keysCount / s
		return kps.toFixed(2)
	}
}
