import ReactDOM from 'react-dom/client'
import '../styles/content.css'
import ToggleScriptButton from './components/ToggleSciprtButton'
import ProprosalButton from './components/ProposalButton'

let listElem = document.createElement('li') as HTMLElement
listElem.id = 'toggle-tabs'
document.querySelector('.nav-messages')?.insertAdjacentElement('afterend', listElem)

ReactDOM.createRoot(listElem).render(<ToggleScriptButton />)

let div = document.createElement("div") as HTMLElement
div.id = 'injected-button'

const shadowDOM = div.attachShadow({mode: 'open'})
const coverLetterDiv = document.querySelector('.cover-letter-area')
coverLetterDiv?.prepend(div)

const renderElement = document.createElement('div')
renderElement.id = 'render'

const linkElem = document.createElement('link')
linkElem.rel = 'stylesheet'
linkElem.type = 'text/css'
linkElem.href = chrome.runtime.getURL('/src/styles/main-compiled.css')

shadowDOM.append(linkElem)


ReactDOM.createRoot(renderElement).render(<ProprosalButton/>)

shadowDOM.appendChild(renderElement)