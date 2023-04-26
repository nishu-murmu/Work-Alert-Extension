import RenderedApp from './RenderedApp'
import ReactDOM from 'react-dom/client'

let rootElement = document.createElement('div')
rootElement.id = 'root-id'

const shadowDOM = rootElement.attachShadow({ mode: 'open' })
document.body.prepend(rootElement)

const renderElement = document.createElement('div')
renderElement.id = 'render'

const linkElem = document.createElement("link")
linkElem.rel = 'stylesheet'
linkElem.type = 'text/css'
linkElem.href = chrome.runtime.getURL('/src/styles/main-compiled.css')

shadowDOM.append(linkElem)

ReactDOM.createRoot(renderElement).render(<RenderedApp />)

shadowDOM.appendChild(renderElement)