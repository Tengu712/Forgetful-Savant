export interface IInputListener {
  update(): void
  get(): readonly string[]
}
