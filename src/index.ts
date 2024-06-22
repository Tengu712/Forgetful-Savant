import {App} from './app/App'
import {Renderer} from './infra/graphics/Renderer'
import {InputListener} from './infra/input/InputListener'

document.addEventListener('DOMContentLoaded', () => {
  const renderer = new Renderer(1280, 720)
  const inputListener = new InputListener()
  new App(renderer, inputListener).run()
})
