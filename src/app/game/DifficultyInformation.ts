import type {Question} from './question/Question'

export type DifficultyInformation = {
	readonly questions: readonly Question[]
	readonly min: number
	readonly max: number
	readonly questionsCount: number
	readonly shouldShowCA: boolean
	readonly hasTimeLimit: boolean
}
