export interface IRenderer {
	clear(): void

	drawRect(l: number, t: number, w: number, h: number, r: number, g: number, b: number): void

	drawString(text: string, align: string, size: number, x: number, y: number, r: number, g: number, b: number): void
}
