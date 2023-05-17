import ReactDOM from 'react-dom/client'
import App from '../components/app'

let linkElement = document.createElement('link')
linkElement.rel = 'stylesheet'
linkElement.type = 'text/css'
linkElement.href = chrome.runtime.getURL('/src/styles/main-compiled.css')
// Attaching Slider component to shadowDOM
let rootElement = document.createElement('div')
rootElement.id = 'root-id'
document.body.prepend(rootElement)
const shadowDOM = rootElement.attachShadow({ mode: 'open' })

shadowDOM.append(linkElement)

const renderElement = document.createElement('div') as HTMLElement
renderElement.id = 'render'
renderElement.style.display = 'none'

ReactDOM.createRoot(renderElement).render(<App />)
shadowDOM.appendChild(renderElement)
