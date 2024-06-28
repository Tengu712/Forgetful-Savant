import type {TypingBuffer} from '../typing/TypingBuffer'

export interface IBoard {
  draw(typingBuffer: TypingBuffer): void
}
