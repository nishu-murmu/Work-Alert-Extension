import RenderedApp from './RenderedApp'
import ReactDOM from 'react-dom/client'
import { RecoilRoot } from 'recoil'

let rootElement = document.createElement('div')
rootElement.id = 'root-id'
const shadowDOM = rootElement.attachShadow({ mode: 'open' })
const renderElement = document.createElement('div')
renderElement.id = 'render'

const linkElem = document.createElement("link")
linkElem.rel = 'stylesheet'
linkElem.type = 'text/css'
linkElem.href = chrome.runtime.getURL('/src/styles/main-compiled.css')

shadowDOM.append(linkElem)
document.body.prepend(rootElement)
ReactDOM.createRoot(renderElement).render(
  <RecoilRoot>
    <RenderedApp />
  </RecoilRoot>,
)
shadowDOM.appendChild(renderElement)
