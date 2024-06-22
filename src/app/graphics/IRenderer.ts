export interface IRenderer {
  clear(): void

  drawString(
    text: string,
    align: string,
    size: number,
    x: number,
    y: number,
    r: number,
    g: number,
    b: number
  ): void
}
