import type {IRenderer} from '@/app/graphics/IRenderer'

export class Renderer implements IRenderer {
	private readonly context: CanvasRenderingContext2D
	private scale: number
	private width: number
	private height: number

	public constructor(width: number, height: number) {
		this.scale = 1
		this.width = width
		this.height = height
		const wph = width / height
		const hpw = height / width

		const canvas = document.getElementById('canvas') as HTMLCanvasElement
		const resize = () => {
			let w = window.innerWidth
			let h = window.innerHeight
			if (w * hpw < h) {
				h = w * hpw
			} else {
				w = h * wph
			}
			this.scale = w / width
			this.width = w
			this.height = h
			canvas.width = w
			canvas.height = h
			canvas.style.width = w + 'px'
			canvas.style.height = h + 'px'
		}
		resize()
		window.addEventListener('resize', resize)

		const context = canvas.getContext('2d')
		if (context === null) {
			throw new Error('[ error ] Renderer(): failed to get 2d of canvas.')
		}
		this.context = context
	}

	public clear() {
		this.context.fillStyle = `rgb(30, 30, 30)`
		this.context.fillRect(0, 0, this.width, this.height)
	}

	public drawRect(l: number, t: number, w: number, h: number, r: number, g: number, b: number) {
		this.context.fillStyle = `rgb(${r * 255}, ${g * 255}, ${b * 255})`
		this.context.fillRect(l * this.width, t * this.height, w * this.width, h * this.height)
	}

	public drawString(text: string, align: string, size: number, x: number, y: number, r: number, g: number, b: number) {
		this.context.textAlign = align as CanvasTextAlign
		this.context.fillStyle = `rgb(${r * 255}, ${g * 255}, ${b * 255})`
		this.context.font = `${size * this.scale}px serif`
		this.context.fillText(text, x * this.width, y * this.height)
	}
}
