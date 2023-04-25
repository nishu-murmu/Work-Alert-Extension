import RenderedApp from './RenderedApp'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import '../styles/main-compiled.css'

let div = document.createElement('div')
div.classList.add('custom-script')
div.style.position = 'absolute'
div.style.width = '100%'
div.style.height = '100%'
div.style.color = '#ffffff'

ReactDOM.createRoot(div).render(
  <RecoilRoot>
    <RenderedApp />
  </RecoilRoot>,
)

document.body.prepend(div)
