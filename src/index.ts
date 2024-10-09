import {App} from './app/App'
import {AsQuestions, type Question} from './app/game/question/Question'
import {Renderer} from './infra/graphics/Renderer'
import {InputListener} from './infra/input/InputListener'

async function getQuestions(): Promise<readonly Question[]> {
	const fetched = await fetch('https://fsa.skdassoc.work/questions.json', {mode: 'cors'})
	const json = await fetched.json()
	return AsQuestions(json)
}

document.addEventListener('DOMContentLoaded', async () => {
	const renderer = new Renderer(1280, 720)
	const inputListener = new InputListener()
	const questions = await getQuestions()
	new App(renderer, inputListener, questions).run()
})
