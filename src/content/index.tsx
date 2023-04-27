import ReactDOM from 'react-dom/client'
import RenderedApp from './RenderedApp'
import ProprosalButton from './components/ProposalButton'

let linkElement = document.createElement('link')
linkElement.rel = 'stylesheet'
linkElement.type = 'text/css'
linkElement.href = chrome.runtime.getURL('/src/styles/main-compiled.css')
// Attaching Slider component to shadowDOM
let rootElement = document.createElement('div')
rootElement.id = 'root-id'
document.body.prepend(rootElement)
const shadowDOM = rootElement.attachShadow({ mode: 'open' })

console.log(linkElement)
shadowDOM.append(linkElement)

const renderElement = document.createElement('div') as HTMLElement
renderElement.id = 'render'

ReactDOM.createRoot(renderElement).render(<RenderedApp />)
shadowDOM.appendChild(renderElement)

window.onload = () => {
  let linkElem = document.createElement('link')
  linkElem.rel = 'stylesheet'
  linkElem.type = 'text/css'
  linkElem.href = chrome.runtime.getURL('/src/styles/main-compiled.css')
  // Attaching ProposalButton component to shadowDOM
  let div = document.createElement('div') as HTMLElement
  div.id = 'injected-button'
  div.style.position = "relative"
  const shadow = div.attachShadow({ mode: 'open' })
  
  const coverLetterDiv = document.querySelector('.cover-letter-area')
  coverLetterDiv?.prepend(div)
  const renderElem = document.createElement('div')
  renderElem.id = 'render-button'
  renderElem.style.right = '2px'
  renderElem.style.bottom = '-20px'
  renderElem.style.position = 'absolute'
  
  console.log(linkElem)
  shadow.append(linkElem)
  ReactDOM.createRoot(renderElem).render(<ProprosalButton />)
  shadow.appendChild(renderElem)
}